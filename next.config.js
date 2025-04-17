/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true, // ← désactive l’optimisation d’image côté serveur
  },
  reactStrictMode: true, // ← recommandé
};

module.exports = nextConfig;