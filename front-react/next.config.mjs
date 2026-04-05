import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Évite l’avertissement « multiple lockfiles » quand un pnpm-lock existe dans c:\laragon\www
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
