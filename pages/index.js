import React from 'react';
import Link from 'next/link';
import { 
  ComputerDesktopIcon, 
  MagnifyingGlassIcon, 
  AcademicCapIcon, 
  ChartBarIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-dark to-secondary-dark text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Formez-vous à l'autonomie digitale grâce à nos formations WordPress</h1>
            <p className="text-xl mb-8">
              Des formations sur-mesure pour artisans, commerçants et indépendants en région PACA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-primary-dark hover:bg-gray-100">
                Personnaliser votre formation
              </Link>
              <Link href="/a-propos" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-dark">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Thématiques Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Nos thématiques de formation</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Développez vos compétences digitales et gagnez en autonomie avec nos formations adaptées à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="card text-center">
              <div className="mx-auto bg-primary-light/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ComputerDesktopIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bases du digital</h3>
              <p className="text-gray-600">
                Maîtrisez les fondamentaux du web et de WordPress pour gérer votre site en toute confiance.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card text-center">
              <div className="mx-auto bg-primary-light/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visibilité</h3>
              <p className="text-gray-600">
                Améliorez votre référencement local et votre présence en ligne pour attirer plus de clients.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card text-center">
              <div className="mx-auto bg-primary-light/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <AcademicCapIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compétences</h3>
              <p className="text-gray-600">
                Développez vos connaissances en HTML, CSS et personnalisation de thèmes WordPress.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card text-center">
              <div className="mx-auto bg-primary-light/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tendances</h3>
              <p className="text-gray-600">
                Restez à jour avec les dernières innovations: IA, outils d'automatisation et bonnes pratiques.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/formations" className="btn btn-primary">
              Voir toutes nos formations
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Formations Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Formations populaires</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Découvrez nos formations les plus demandées par les professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Formation 1 */}
            <div className="card overflow-hidden">
              <div className="h-48 bg-gray-300 mb-4 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    WordPress
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">A001-WP-DD</h3>
                <p className="text-gray-800 mb-4">Création site internet (WordPress) & Stratégie de développement Digital</p>
                <Link href="/contact?formation=A001-WP-DD" className="btn btn-primary w-full">
                  Consulter
                </Link>
              </div>
            </div>

            {/* Formation 2 */}
            <div className="card overflow-hidden">
              <div className="h-48 bg-gray-300 mb-4 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    SEO
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">A011-SW-SEO</h3>
                <p className="text-gray-800 mb-4">Les fondamentaux (SEO/Paid) avec le plugin SEOPress</p>
                <Link href="/contact?formation=A011-SW-SEO" className="btn btn-primary w-full">
                  Consulter
                </Link>
              </div>
            </div>

            {/* Formation 3 */}
            <div className="card overflow-hidden">
              <div className="h-48 bg-gray-300 mb-4 relative">
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    IA
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">A015-IA-GPT</h3>
                <p className="text-gray-800 mb-4">Génération de contenu avec ChatGPT + Automatisation Marketing</p>
                <Link href="/contact?formation=A015-IA-GPT" className="btn btn-primary w-full">
                  Consulter
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/formations" className="btn btn-outline">
              Voir le catalogue complet
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Ce que disent mes clients</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Découvrez les retours d'expérience de professionnels ayant suivi mes formations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-primary-dark font-bold">ML</span>
                </div>
                <div>
                  <h4 className="font-bold">Marie L.</h4>
                  <p className="text-gray-600 text-sm">Artisan fleuriste, Antibes</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Grâce à la formation d'Aurélien, je gère maintenant mon site WordPress en toute autonomie. Sa pédagogie et sa patience m'ont permis de comprendre rapidement les bases essentielles."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-primary-dark font-bold">PT</span>
                </div>
                <div>
                  <h4 className="font-bold">Pierre T.</h4>
                  <p className="text-gray-600 text-sm">Consultant indépendant, Nice</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Formation sur-mesure et très pratique. J'ai particulièrement apprécié l'approche personnalisée qui m'a permis d'appliquer directement les connaissances à mon propre site."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-primary-dark font-bold">SB</span>
                </div>
                <div>
                  <h4 className="font-bold">Sophie B.</h4>
                  <p className="text-gray-600 text-sm">Boutique de décoration, Cannes</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Une formation WordPress qui a transformé ma présence en ligne. Aurélien a su adapter son enseignement à mon niveau et m'a donné les clés pour être autonome."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Exemples de projets accompagnés</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Découvrez quelques réalisations de clients formés et accompagnés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="card overflow-hidden">
              <div className="h-48 bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Boutique en ligne artisanale</h3>
              <p className="text-gray-600 mb-4">
                Formation WordPress + WooCommerce pour une artisane créatrice de bijoux
              </p>
              <Link href="/contact" className="text-primary font-medium hover:text-primary-dark">
                En savoir plus →
              </Link>
            </div>

            {/* Project 2 */}
            <div className="card overflow-hidden">
              <div className="h-48 bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Site vitrine restaurant</h3>
              <p className="text-gray-600 mb-4">
                Formation et accompagnement pour un restaurant local souhaitant gérer ses menus
              </p>
              <Link href="/contact" className="text-primary font-medium hover:text-primary-dark">
                En savoir plus →
              </Link>
            </div>

            {/* Project 3 */}
            <div className="card overflow-hidden">
              <div className="h-48 bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-bold mb-2">Portfolio photographe</h3>
              <p className="text-gray-600 mb-4">
                Formation WordPress et optimisation des images pour un photographe indépendant
              </p>
              <Link href="/contact" className="text-primary font-medium hover:text-primary-dark">
                En savoir plus →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-primary-dark text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Pourquoi choisir Gestionmax ?</h2>
            <p className="text-xl text-gray-200 mt-4 max-w-3xl mx-auto">
              Une approche pédagogique centrée sur votre autonomie et vos besoins spécifiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-secondary-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Formation certifiée Qualiopi</h3>
                <p className="text-gray-200">
                  Des formations éligibles aux financements professionnels, avec une garantie de qualité reconnue.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-secondary-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Approche sur-mesure</h3>
                <p className="text-gray-200">
                  Chaque formation est adaptée à votre niveau, vos objectifs et votre secteur d'activité.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-secondary-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Expertise WordPress</h3>
                <p className="text-gray-200">
                  Une maîtrise approfondie de WordPress, HTML, CSS et des meilleures pratiques du web.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <CheckCircleIcon className="h-6 w-6 text-secondary-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Suivi post-formation</h3>
                <p className="text-gray-200">
                  Un accompagnement continu pour vous aider à mettre en pratique vos nouvelles compétences.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn bg-white text-primary-dark hover:bg-gray-100">
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à développer vos compétences digitales ?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contactez-moi dès aujourd'hui pour discuter de vos besoins et créer une formation WordPress sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn bg-white text-primary-dark hover:bg-gray-100">
                Personnaliser votre formation
              </Link>
              <Link href="/formations" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-dark">
                Consulter le catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
