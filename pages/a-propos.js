import React from 'react';
import Link from 'next/link';
import { 
  UserIcon, 
  AcademicCapIcon, 
  LightBulbIcon, 
  CodeBracketIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export default function About() {
  return (
    <div>
     {/* Hero Section - À propos */}
<section
  className="relative text-white py-20 bg-cover bg-center"
  style={{
    backgroundImage: "url('https://res.cloudinary.com/deebdv0jr/image/upload/v1744795094/Formation-wordpress-antibes_npzw8u.webp')",
  }}
>
  {/* Filtre sombre pour lisibilité */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Contenu de la section */}
  <div className="relative z-10 container-custom">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6 text-white">À propos</h1>
      <p className="text-xl mb-8">
        Découvrez qui je suis et comment je peux vous aider à gagner en autonomie digitale
      </p>
    </div>
  </div>
</section>


      {/* Formateur Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Aurélien Lavayssière</h2>
              <p className="text-xl text-gray-600 mb-4">
                Consultant formateur certifié Qualiopi, spécialisé en WordPress et développement web
              </p>
              <p className="mb-4">
                Passionné par le web et la pédagogie, j'accompagne depuis plus de 10 ans les artisans, commerçants et indépendants dans leur transition digitale.
              </p>
              <p className="mb-6">
                Mon objectif : vous rendre autonome dans la gestion de votre site web et vous transmettre les compétences nécessaires pour développer votre présence en ligne.
              </p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Ma mission</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Rendre les professionnels autonomes dans la gestion de leur site web
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission 1 */}
            <div className="card text-center">
              <div className="mx-auto bg-primary-light/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <UserIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accompagnement personnalisé</h3>
              <p className="text-gray-600">
                Je m'adapte à votre niveau, vos objectifs et votre secteur d'activité pour vous proposer une formation sur-mesure.
              </p>
            </div>

            {/* Mission 2 */}
            <div className="card text-center">
              <div className="mx-auto bg-primary-light/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <LightBulbIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simplification</h3>
              <p className="text-gray-600">
                Je démystifie les aspects techniques du web pour les rendre accessibles et compréhensibles par tous.
              </p>
            </div>

            {/* Mission 3 */}
            <div className="card text-center">
              <div className="mx-auto bg-primary-light/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <AcademicCapIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Partage de connaissances</h3>
              <p className="text-gray-600">
                Je vous transmets mon savoir-faire et mes astuces pour que vous puissiez gérer votre site en toute autonomie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competences Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Mes compétences</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Une expertise technique et pédagogique au service de votre projet web
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Competence 1 */}
            <div className="card flex">
              <div className="mr-4">
                <div className="bg-primary-light/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <CodeBracketIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">WordPress</h3>
                <p className="text-gray-600">
                  Maîtrise avancée de WordPress, création de sites, personnalisation de thèmes, utilisation des plugins essentiels et optimisation des performances.
                </p>
              </div>
            </div>

            {/* Competence 2 */}
            <div className="card flex">
              <div className="mr-4">
                <div className="bg-primary-light/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <CodeBracketIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">HTML & CSS</h3>
                <p className="text-gray-600">
                  Développement front-end, création de mises en page responsives, personnalisation avancée de l'apparence des sites web.
                </p>
              </div>
            </div>

            {/* Competence 3 */}
            <div className="card flex">
              <div className="mr-4">
                <div className="bg-primary-light/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <CodeBracketIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">JavaScript</h3>
                <p className="text-gray-600">
                  Ajout d'interactivité aux sites web, animations, validation de formulaires et intégration d'API tierces.
                </p>
              </div>
            </div>

            {/* Competence 4 */}
            <div className="card flex">
              <div className="mr-4">
                <div className="bg-primary-light/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <PuzzlePieceIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">SEO & Marketing Digital</h3>
                <p className="text-gray-600">
                  Optimisation pour les moteurs de recherche, stratégies de contenu, référencement local et analyse de données.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthode Pédagogique Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Ma méthode pédagogique</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Une approche pratique et personnalisée pour un apprentissage efficace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Évaluation des besoins</h3>
                    <p className="text-gray-600">
                      Je commence par comprendre vos objectifs, votre niveau actuel et vos attentes spécifiques pour adapter le contenu de la formation.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Formation pratique</h3>
                    <p className="text-gray-600">
                      L'apprentissage se fait par la pratique, sur votre propre site ou sur un environnement de test, pour une application immédiate des connaissances.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Support documentaire</h3>
                    <p className="text-gray-600">
                      Vous recevez des supports de cours personnalisés et des tutoriels adaptés à votre niveau pour faciliter la révision après la formation.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Suivi post-formation</h3>
                    <p className="text-gray-600">
                      Je reste disponible après la formation pour répondre à vos questions et vous aider à mettre en pratique vos nouvelles compétences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-primary-dark">Certification Qualiopi</h3>
              <p className="mb-6">
                En tant que formateur certifié Qualiopi, je m'engage à respecter les critères de qualité exigés par cette certification nationale :
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Adaptation aux besoins spécifiques des stagiaires</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Adéquation des moyens pédagogiques aux objectifs</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Qualification et développement des connaissances du formateur</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Recueil et prise en compte des appréciations des stagiaires</p>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="btn btn-primary">
                  Télécharger la certification
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à développer vos compétences WordPress ?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contactez-moi dès aujourd'hui pour discuter de vos besoins et créer une formation sur-mesure.
            </p>
            <Link href="/contact" className="btn bg-white text-primary-dark hover:bg-gray-100">
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
