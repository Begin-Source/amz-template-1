import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'

interface ProductData {
  asin: string
  imageUrl: string
  title: string
}

interface UpdateReport {
  updated: Array<{
    file: string
    asin: string
    oldUrl: string
    newUrl: string
  }>
  skipped: Array<{
    file: string
    reason: string
  }>
  notFound: string[]
}

/**
 * Parse CSV line properly handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current.trim())
  return result
}

/**
 * Parse CSV file and extract ASIN to Image URL mapping
 */
function parseCSV(csvPath: string): Map<string, ProductData> {
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const lines = csvContent.split('\n').filter(line => line.trim())
  
  // Parse headers
  const headers = parseCSVLine(lines[0]).map(h => h.replace(/^"|"$/g, '').trim())
  
  console.log(`📋 CSV Headers found: ${headers.length} columns`)
  console.log(`   Looking for: "asin", "title", "images.large"\n`)
  
  // Find column indexes
  const asinIndex = headers.findIndex(h => h === 'asin')
  const imageIndex = headers.findIndex(h => h === 'images.large')
  const titleIndex = headers.findIndex(h => h === 'title')
  
  console.log(`   Column positions:`)
  console.log(`   - asin: ${asinIndex}`)
  console.log(`   - title: ${titleIndex}`)
  console.log(`   - images.large: ${imageIndex}\n`)
  
  if (asinIndex === -1 || imageIndex === -1) {
    throw new Error('CSV must contain "asin" and "images.large" columns')
  }
  
  const productMap = new Map<string, ProductData>()
  
  // Parse data rows (skip header)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    const values = parseCSVLine(line).map(v => v.replace(/^"|"$/g, '').trim())
    const asin = values[asinIndex]
    const imageUrl = values[imageIndex]
    const title = titleIndex !== -1 ? values[titleIndex] : ''
    
    if (asin && imageUrl && imageUrl !== '') {
      productMap.set(asin, { asin, imageUrl, title })
    }
  }
  
  console.log(`📊 Parsed ${productMap.size} products from CSV\n`)
  return productMap
}

/**
 * Update MDX file with new image URL
 */
function updateMDXFile(
  filePath: string,
  newImageUrl: string
): { success: boolean; oldUrl: string } {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)
  
  const oldUrl = frontmatter.image || ''
  
  // Update image URL
  frontmatter.image = newImageUrl
  
  // Stringify back to MDX
  const updatedContent = matter.stringify(content, frontmatter)
  fs.writeFileSync(filePath, updatedContent, 'utf-8')
  
  return { success: true, oldUrl }
}

/**
 * Main function to update all MDX files
 */
function updateImagesFromCSV(csvPath: string, reviewsDir: string): UpdateReport {
  console.log('🚀 Starting image update process...\n')
  
  // Parse CSV
  const productMap = parseCSV(csvPath)
  
  // Get all MDX files
  const mdxFiles = fs.readdirSync(reviewsDir).filter(f => f.endsWith('.mdx'))
  console.log(`📁 Found ${mdxFiles.length} MDX files in reviews directory\n`)
  
  const report: UpdateReport = {
    updated: [],
    skipped: [],
    notFound: []
  }
  
  // Process each MDX file
  for (const fileName of mdxFiles) {
    const filePath = path.join(reviewsDir, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter } = matter(fileContent)
    
    const asin = frontmatter.asin
    
    if (!asin) {
      report.skipped.push({
        file: fileName,
        reason: 'No ASIN in frontmatter'
      })
      continue
    }
    
    const productData = productMap.get(asin)
    
    if (!productData) {
      report.notFound.push(asin)
      report.skipped.push({
        file: fileName,
        reason: `ASIN ${asin} not found in CSV`
      })
      continue
    }
    
    const currentImageUrl = frontmatter.image || ''
    
    // Check if update is needed
    if (currentImageUrl === productData.imageUrl) {
      report.skipped.push({
        file: fileName,
        reason: 'Image URL already up to date'
      })
      continue
    }
    
    // Update the file
    const result = updateMDXFile(filePath, productData.imageUrl)
    
    report.updated.push({
      file: fileName,
      asin,
      oldUrl: result.oldUrl,
      newUrl: productData.imageUrl
    })
  }
  
  return report
}

/**
 * Print update report
 */
function printReport(report: UpdateReport) {
  console.log('\n' + '='.repeat(80))
  console.log('📋 UPDATE REPORT')
  console.log('='.repeat(80) + '\n')
  
  // Updated files
  if (report.updated.length > 0) {
    console.log(`✅ UPDATED ${report.updated.length} FILES:\n`)
    report.updated.forEach(({ file, asin, oldUrl, newUrl }) => {
      console.log(`  📝 ${file}`)
      console.log(`     ASIN: ${asin}`)
      console.log(`     Old: ${oldUrl}`)
      console.log(`     New: ${newUrl}`)
      console.log('')
    })
  } else {
    console.log('✅ No files needed updating (all images are current)\n')
  }
  
  // Skipped files
  if (report.skipped.length > 0) {
    console.log(`⏭️  SKIPPED ${report.skipped.length} FILES:\n`)
    report.skipped.forEach(({ file, reason }) => {
      console.log(`  ⚠️  ${file}: ${reason}`)
    })
    console.log('')
  }
  
  // Summary
  console.log('='.repeat(80))
  console.log('📊 SUMMARY')
  console.log('='.repeat(80))
  console.log(`  Total Updated: ${report.updated.length}`)
  console.log(`  Total Skipped: ${report.skipped.length}`)
  console.log(`  ASINs Not Found in CSV: ${report.notFound.length}`)
  console.log('='.repeat(80) + '\n')
  
  if (report.updated.length > 0) {
    console.log('✨ All image URLs have been successfully updated!')
  }
}

// Main execution
const csvPath = path.join(process.cwd(), 'products 20251230-05212.csv')
const reviewsDir = path.join(process.cwd(), 'content', 'reviews')

try {
  const report = updateImagesFromCSV(csvPath, reviewsDir)
  printReport(report)
} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}

