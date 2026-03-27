/** @type {import('next').NextConfig} */

const isStaticExport = process.env.NODE_ENV === "production"

const nextConfig = {
  // Production mode: Static export for deployment
  ...(isStaticExport && { output: "export" }),
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Keep default page extensions.
}

export default nextConfig
