/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← nécessaire pour Scalingo si tu veux faire du export statique
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true, // ← désactive l’optimisation d’image côté serveur
  },
  reactStrictMode: true, // ← recommandé
};

module.exports = nextConfig;