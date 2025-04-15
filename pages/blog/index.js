import React from 'react';
import Link from 'next/link';

// Données factices pour les articles de blog
const blogPosts = [
  {
    id: 1,
    title: "Comment optimiser votre site WordPress pour le référencement local",
    excerpt: "Découvrez les meilleures pratiques pour améliorer la visibilité de votre site WordPress dans les recherches locales et attirer plus de clients de proximité.",
    date: "15 avril 2025",
    category: "SEO",
    image: "/images/blog/seo-local.jpg"
  },
  {
    id: 2,
    title: "Les extensions WordPress essentielles pour les artisans et commerçants",
    excerpt: "Une sélection des plugins WordPress les plus utiles pour les petites entreprises souhaitant améliorer leur présence en ligne et faciliter la gestion de leur site.",
    date: "8 avril 2025",
    category: "WordPress",
    image: "/images/blog/plugins-wordpress.jpg"
  },
  {
    id: 3,
    title: "Comment l'IA peut aider les TPE à améliorer leur communication digitale",
    excerpt: "Explorez les outils d'intelligence artificielle accessibles qui peuvent transformer votre stratégie de contenu et votre présence en ligne, même avec un budget limité.",
    date: "1 avril 2025",
    category: "IA & outils",
    image: "/images/blog/ia-tpe.jpg"
  },
  {
    id: 4,
    title: "Créer une newsletter efficace pour fidéliser vos clients",
    excerpt: "Apprenez à mettre en place une stratégie d'email marketing simple et efficace pour maintenir le contact avec vos clients et générer des ventes récurrentes.",
    date: "25 mars 2025",
    category: "Marketing",
    image: "/images/blog/newsletter.jpg"
  },
  {
    id: 5,
    title: "Les bases du HTML et CSS pour personnaliser votre thème WordPress",
    excerpt: "Un guide débutant pour comprendre et modifier le code de votre site WordPress, avec des exemples pratiques de personnalisation pour les non-développeurs.",
    date: "18 mars 2025",
    category: "Formation",
    image: "/images/blog/html-css.jpg"
  },
  {
    id: 6,
    title: "Comment choisir le bon hébergement pour votre site WordPress",
    excerpt: "Les critères essentiels à prendre en compte pour sélectionner un hébergeur adapté à votre site WordPress, en fonction de vos besoins et de votre budget.",
    date: "10 mars 2025",
    category: "WordPress",
    image: "/images/blog/hebergement.jpg"
  }
];

// Catégories pour le filtre
const categories = [
  "Tous",
  "WordPress",
  "Formation",
  "SEO",
  "IA & outils",
  "Marketing"
];

export default function Blog() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-secondary-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Actualités & Blog</h1>
            <p className="text-xl mb-8">
              Restez informé des dernières tendances du web, astuces WordPress et conseils pour votre présence en ligne
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          {/* Categories Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="card overflow-hidden flex flex-col h-full">
                <div className="h-48 bg-gray-300 mb-4 relative">
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                </div>
                <div>
                  <Link href={`/blog/${post.id}`} className="text-primary font-medium hover:text-primary-dark">
                    Lire la suite →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                Précédent
              </button>
              <button className="px-4 py-2 rounded-md bg-primary text-white">
                1
              </button>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                Suivant
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-gray-100 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Abonnez-vous à notre newsletter</h2>
              <p className="text-xl text-gray-600 mb-8">
                Recevez nos derniers articles, conseils et astuces directement dans votre boîte mail.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  S'inscrire
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                Nous respectons votre vie privée. Désabonnez-vous à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
