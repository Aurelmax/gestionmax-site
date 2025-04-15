import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

// Dossiers de contenu
const contentTypes = {
  formations: path.join(process.cwd(), 'content', 'formations'),
  blog: path.join(process.cwd(), 'content', 'blog'),
  testimonials: path.join(process.cwd(), 'content', 'testimonials'),
  projects: path.join(process.cwd(), 'content', 'projects'),
};

// Fonction pour obtenir des données simulées pour le développement
function getMockData(contentType) {
  switch(contentType) {
    case 'formations':
      return [
        {
          slug: 'wordpress-debutant',
          frontmatter: {
            title: 'WordPress pour débutants',
            id: 'WP-101',
            category: 'WordPress',
            level: 'Débutant',
            duration: '14 heures (2 jours)',
            price: '980€',
            image: '/images/formations/wordpress-debutant.jpg',
            featured: true,
            description: 'Apprenez les bases de WordPress pour créer et gérer votre site web en toute autonomie.'
          },
          content: '# WordPress pour débutants\n\nApprenez à créer et gérer votre site web avec WordPress...'
        },
        {
          slug: 'woocommerce-essentiel',
          frontmatter: {
            title: 'WooCommerce Essentiel',
            id: 'WC-201',
            category: 'E-commerce',
            level: 'Intermédiaire',
            duration: '21 heures (3 jours)',
            price: '1450€',
            image: '/images/formations/woocommerce.jpg',
            featured: true,
            description: 'Créez votre boutique en ligne avec WooCommerce et optimisez vos ventes.'
          },
          content: '# WooCommerce Essentiel\n\nApprenez à créer et gérer votre boutique en ligne...'
        },
        {
          slug: 'seo-wordpress',
          frontmatter: {
            title: 'SEO pour WordPress',
            id: 'SEO-301',
            category: 'SEO',
            level: 'Tous niveaux',
            duration: '14 heures (2 jours)',
            price: '1200€',
            image: '/images/formations/seo-wordpress.jpg',
            featured: false,
            description: 'Optimisez votre référencement naturel et améliorez la visibilité de votre site WordPress.'
          },
          content: '# SEO pour WordPress\n\nApprenez à optimiser votre site pour les moteurs de recherche...'
        }
      ];
    case 'blog':
      return [
        {
          slug: 'nouveautes-wordpress-2025',
          frontmatter: {
            title: 'Les nouveautés WordPress en 2025',
            date: '2025-03-15',
            author: 'Aurélien Lavayssière',
            category: 'WordPress',
            tags: ['WordPress', 'Actualités', 'Gutenberg'],
            image: '/images/blog/wordpress-2025.jpg',
            excerpt: 'Découvrez les nouvelles fonctionnalités de WordPress en 2025 et comment elles peuvent améliorer votre site web.'
          },
          content: '# Les nouveautés WordPress en 2025\n\nWordPress continue d\'évoluer avec de nouvelles fonctionnalités...'
        },
        {
          slug: 'optimiser-vitesse-site',
          frontmatter: {
            title: 'Comment optimiser la vitesse de votre site WordPress',
            date: '2025-02-20',
            author: 'Aurélien Lavayssière',
            category: 'Performance',
            tags: ['WordPress', 'Performance', 'Optimisation'],
            image: '/images/blog/vitesse-site.jpg',
            excerpt: 'Améliorez les performances de votre site WordPress avec ces conseils d\'optimisation essentiels.'
          },
          content: '# Comment optimiser la vitesse de votre site WordPress\n\nLa vitesse de chargement est cruciale pour l\'expérience utilisateur...'
        }
      ];
    case 'testimonials':
      return [
        {
          slug: 'sophie-martin',
          frontmatter: {
            name: 'Sophie Martin',
            company: 'Fleurs de Provence',
            position: 'Gérante',
            avatar: '/images/testimonials/sophie-martin.jpg',
            rating: 5,
            text: 'La formation WordPress m\'a permis de prendre en main mon site web et de le mettre à jour régulièrement sans dépendre d\'une agence. Aurélien est un formateur patient et pédagogue.',
            featured: true,
            formation: 'wordpress-debutant',
            date: '2025-01-10'
          }
        },
        {
          slug: 'thomas-dubois',
          frontmatter: {
            name: 'Thomas Dubois',
            company: 'Artisan Boulanger',
            position: 'Propriétaire',
            avatar: '/images/testimonials/thomas-dubois.jpg',
            rating: 5,
            text: 'Grâce à la formation WooCommerce, j\'ai pu créer ma boutique en ligne et proposer mes produits à la vente. Un vrai plus pour mon activité !',
            featured: true,
            formation: 'woocommerce-essentiel',
            date: '2024-11-15'
          }
        }
      ];
    case 'projects':
      return [
        {
          slug: 'boutique-artisanale',
          frontmatter: {
            title: 'Boutique Artisanale en Ligne',
            client: 'Les Créations d\'Émilie',
            category: 'E-commerce',
            date: '2024-12-01',
            image: '/images/projects/boutique-artisanale.jpg',
            gallery: ['/images/projects/boutique-1.jpg', '/images/projects/boutique-2.jpg'],
            url: 'https://exemple.com',
            featured: true,
            description: 'Création d\'une boutique en ligne pour une artisane créatrice de bijoux.'
          },
          content: '# Boutique Artisanale en Ligne\n\n## Contexte\n\nÉmilie souhaitait vendre ses créations en ligne...'
        },
        {
          slug: 'site-restaurant',
          frontmatter: {
            title: 'Site Vitrine Restaurant',
            client: 'La Table Provençale',
            category: 'Site vitrine',
            date: '2024-10-15',
            image: '/images/projects/restaurant.jpg',
            gallery: ['/images/projects/restaurant-1.jpg', '/images/projects/restaurant-2.jpg'],
            url: 'https://exemple.com',
            featured: false,
            description: 'Création d\'un site vitrine pour un restaurant traditionnel avec réservation en ligne.'
          },
          content: '# Site Vitrine Restaurant\n\n## Contexte\n\nLe restaurant souhaitait moderniser sa présence en ligne...'
        }
      ];
    default:
      return [];
  }
}

// Lire tous les fichiers d'un type de contenu
export function getAllContentFiles(contentType) {
  if (!contentTypes[contentType]) {
    throw new Error(`Type de contenu inconnu: ${contentType}`);
  }

  // Simuler des données pour le développement front-end
  // Dans une implémentation réelle, cela utiliserait fs.readdirSync et fs.readFileSync
  return getMockData(contentType);
}

// Récupérer un fichier spécifique par son slug
export function getContentBySlug(contentType, slug) {
  // Simuler la récupération d'un contenu spécifique
  const allContent = getAllContentFiles(contentType);
  const content = allContent.find(item => item.slug === slug);
  
  if (!content) {
    throw new Error(`Contenu non trouvé: ${contentType}/${slug}`);
  }
  
  return content;
}

// Récupérer tous les slugs pour un type de contenu
export function getAllContentSlugs(contentType) {
  const allContent = getAllContentFiles(contentType);
  
  return allContent.map(content => ({
    params: {
      slug: content.slug
    }
  }));
}

// Sérialiser le contenu MDX pour le rendu
export async function serializeMDX(content) {
  return serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeHighlight],
      remarkPlugins: [remarkGfm],
    },
  });
}
