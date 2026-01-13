/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  // Remove this line during development to enable dynamic routes
  ...(process.env.NODE_ENV === "production" && { output: "export" }),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
