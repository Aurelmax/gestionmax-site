import React from 'react';
import Link from 'next/link';
import { AcademicCapIcon, ChartBarIcon, LightBulbIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

// Données des formations
const formationCategories = [
  {
    id: 'bases-digital',
    title: 'Maîtrisez les Bases du Digital',
    icon: <AcademicCapIcon className="h-8 w-8 text-white" />,
    description: 'Accédez aux formations pour développer vos compétences digitales.',
    color: 'bg-primary-dark',
    formations: [
      {
        id: 'A001-WP-DD',
        title: 'Création site internet (WordPress) & Stratégie de développement Digital',
        image: '/images/formations/creation-site-wordpress.jpg',
        category: 'WordPress'
      },
      {
        id: 'A008-BD-WC',
        title: 'Marketing digital Bases & Techniques de vente en ligne (WooCommerce)',
        image: '/images/formations/marketing-digital-bases.jpg',
        category: 'Marketing'
      },
      {
        id: 'A009-SM-MA',
        title: "Gestion de la sécurité (WordPress) + Techniques d'analyse statistique Web",
        image: '/images/formations/securite-wordpress.jpg',
        category: 'WordPress'
      }
    ]
  },
  {
    id: 'visibilite',
    title: 'Boostez votre Visibilité',
    icon: <ChartBarIcon className="h-8 w-8 text-white" />,
    description: 'Explorez nos formations pour développer vos compétences digitales.',
    color: 'bg-secondary',
    formations: [
      {
        id: 'A010-WP-IM',
        title: 'Créer et gérer un site WordPress & Stratégie de contenu Inbound Marketing',
        image: '/images/formations/wordpress-inbound-marketing.jpg',
        category: 'WordPress'
      },
      {
        id: 'A011-SW-SEO',
        title: 'Les fondamentaux (SEO/Paid) avec le plugin SEOPress',
        image: '/images/formations/seo-seopress.jpg',
        category: 'SEO'
      },
      {
        id: 'A011-SW-WC',
        title: 'SEOPress Les fondamentaux et techniques de vente WooCommerce',
        image: '/images/formations/seopress-woocommerce.jpg',
        category: 'E-commerce'
      }
    ]
  },
  {
    id: 'competences',
    title: 'Développez des Compétences',
    icon: <LightBulbIcon className="h-8 w-8 text-white" />,
    description: 'Explorez nos formations pour développer vos compétences digitales.',
    color: 'bg-primary',
    formations: [
      {
        id: 'A012-CV-WEB-WC',
        title: 'Maîtriser Canva pour le web, les réseaux sociaux et la vente en ligne',
        image: '/images/formations/canva-web.jpg',
        category: 'Design'
      },
      {
        id: 'A014-FB-LI',
        title: 'Maîtriser Facebook Ads et LinkedIn Ads pour une stratégie publicitaire efficace',
        image: '/images/formations/facebook-linkedin-ads.jpg',
        category: 'Réseaux Sociaux'
      },
      {
        id: 'A015-IA-GPT',
        title: 'Génération de contenu avec ChatGPT + Automatisation Marketing',
        image: '/images/formations/ia-chatgpt.jpg',
        category: 'IA'
      }
    ]
  },
  {
    id: 'tendances',
    title: 'Anticipez les Tendances',
    icon: <RocketLaunchIcon className="h-8 w-8 text-white" />,
    description: 'Explorez nos formations pour développer vos compétences digitales.',
    color: 'bg-secondary-dark',
    formations: [
      {
        id: 'A016-IA-CGPT-WP',
        title: 'Intégrer ChatGPT et optimiser votre relation client grâce à l\'IA',
        image: '/images/formations/chatgpt-relation-client.jpg',
        category: 'IA',
        soon: true
      },
      {
        id: 'A017-MK-AUTO',
        title: 'Lancez vos premiers automatismes avec Make pour gagner en efficacité',
        image: '/images/formations/make-automatisation.jpg',
        category: 'Automatisation',
        soon: true
      },
      {
        id: 'A018-DF-AUTO',
        title: 'Dématérialisez vos formulaires et automatisez vos données',
        image: '/images/formations/formulaires-automatisation.jpg',
        category: 'Automatisation',
        soon: true
      }
    ]
  }
];

export default function Formations() {
  return (
    <div>
      {/* Hero Section */}
<section
  className="relative text-white py-20 bg-cover bg-center"
  style={{
    backgroundImage: "url('https://res.cloudinary.com/deebdv0jr/image/upload/v1744795094/Formation-wordpress-antibes_npzw8u.webp')",
  }}
>
  {/* Filtre noir transparent pour lisibilité */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Contenu de la section */}
  <div className="relative z-10 container-custom">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6 text-white">
        Catalogue de Formations
      </h1>
      <p className="text-xl mb-8">
        Des formations WordPress sur-mesure pour développer vos compétences digitales
      </p>
    </div>
  </div>
</section>


      {/* Formations Catalogue */}
      {formationCategories.map((category) => (
        <section key={category.id} className="section bg-white">
          <div className="container-custom">
            <div className="flex items-center mb-12">
              <div className={`${category.color} p-4 rounded-full mr-4`}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{category.title}</h2>
                <p className="text-gray-600 mt-2">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.formations.map((formation) => (
                <div key={formation.id} className="card overflow-hidden">
                  <div className="h-48 bg-gray-300 mb-4 relative">
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        {formation.category}
                      </span>
                    </div>
                    {formation.soon && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Prochainement
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{formation.id}</h3>
                    <p className="text-gray-800 mb-4">{formation.title}</p>
                    {formation.soon ? (
                      <button className="btn bg-yellow-500 text-white hover:bg-yellow-600 w-full">
                        Prochainement
                      </button>
                    ) : (
                      <Link href={`/contact?formation=${formation.id}`} className="btn btn-primary w-full">
                        Consulter
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Formation sur-mesure</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Vous ne trouvez pas la formation qui vous convient ? Contactez-moi pour créer un programme personnalisé adapté à vos besoins spécifiques.
            </p>
            <Link href="/contact" className="btn bg-white text-primary-dark hover:bg-gray-100">
              Demander un devis personnalisé
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Questions fréquentes sur les formations</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Tout ce que vous devez savoir avant de vous inscrire à une formation
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Quel est le format des formations ?</h3>
              <p className="text-gray-600">
                Les formations peuvent être dispensées en présentiel dans vos locaux, à distance via visioconférence, ou dans un espace de coworking à Antibes. La durée et le rythme sont adaptés à vos besoins.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Les formations sont-elles certifiantes ?</h3>
              <p className="text-gray-600">
                Oui, toutes nos formations sont certifiées Qualiopi et peuvent être prises en charge par votre OPCO ou dans le cadre du CPF. Une attestation de formation vous sera délivrée à l'issue du parcours.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Comment se déroule une formation ?</h3>
              <p className="text-gray-600">
                Chaque formation alterne théorie et pratique, avec des exercices concrets sur votre propre site ou projet. Un support de cours personnalisé vous est remis, et un suivi post-formation est assuré pour répondre à vos questions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Puis-je adapter le contenu d'une formation ?</h3>
              <p className="text-gray-600">
                Absolument ! Toutes nos formations sont personnalisables. Nous définirons ensemble les modules qui correspondent le mieux à vos objectifs et à votre niveau de compétence actuel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
