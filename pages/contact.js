import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export default function Contact() {
  const router = useRouter();
  const { formation } = router.query;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
  });

  // Mettre à jour le sujet et le message si une formation est spécifiée
  useEffect(() => {
    if (formation) {
      setFormData(prev => ({
        ...prev,
        subject: 'formation',
        message: `Je souhaite obtenir plus d'informations sur la formation ${formation}.`
      }));
    }
  }, [formation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique pour envoyer le formulaire
    console.log('Formulaire soumis:', formData);
    alert('Merci pour votre message ! Nous vous contacterons rapidement.');
  };

  return (
    <div>
      {/* Hero Section - Contact & Ressources */}
<section
  className="relative text-white py-20 bg-cover bg-center"
  style={{
    backgroundImage: "url('https://res.cloudinary.com/deebdv0jr/image/upload/v1744795094/Formation-wordpress-antibes_npzw8u.webp')",
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  <div className="relative z-10 container-custom">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6 text-white">Contact & Ressources</h1>
      <p className="text-xl mb-8">
        Prenez contact pour personnaliser votre formation ou accédez à nos ressources documentaires
      </p>
    </div>
  </div>
</section>



      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contactez-moi</h2>
              <p className="text-gray-600 mb-8">
                Vous souhaitez en savoir plus sur mes formations WordPress ou discuter de votre projet ? Remplissez le formulaire ci-dessous et je vous répondrai dans les plus brefs délais.
              </p>
              
              {formation && (
                <div className="bg-blue-50 border-l-4 border-primary p-4 mb-6">
                  <p className="text-primary-dark">
                    Vous avez sélectionné la formation <strong>{formation}</strong>. Veuillez compléter le formulaire ci-dessous pour recevoir plus d'informations.
                  </p>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="formation">Formation WordPress</option>
                    <option value="accompagnement">Accompagnement personnalisé</option>
                    <option value="devis">Demande de devis</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    J'accepte que mes données soient traitées conformément à la <Link href="/mentions-legales" className="text-primary hover:text-primary-dark">politique de confidentialité</Link> *
                  </label>
                </div>
                
                <div>
                  <button type="submit" className="btn btn-primary">
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Info & Resources */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-8">
                <h3 className="text-2xl font-bold mb-6">Coordonnées</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <EnvelopeIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <a href="mailto:contact@gestionmax.fr" className="text-primary hover:text-primary-dark">
                        contact@gestionmax.fr
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <PhoneIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Téléphone</h4>
                      <a href="tel:+33400000000" className="text-primary hover:text-primary-dark">
                        +33 4 00 00 00 00
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <MapPinIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold">Localisation</h4>
                      <p>Antibes, Alpes-Maritimes (06)</p>
                      <p className="text-gray-600">Interventions en région PACA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Resources */}
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Espace Ressources</h3>
                <p className="text-gray-600 mb-6">
                  Téléchargez les documents réglementaires et supports de formation
                </p>
                
                <div className="space-y-4">
                  <a 
                    href="#" 
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="mr-4">
                      <DocumentTextIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold">Certification Qualiopi</h4>
                      <p className="text-sm text-gray-600">PDF, 2.1 MB</p>
                    </div>
                    <div>
                      <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="mr-4">
                      <DocumentTextIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold">Programme de formation WordPress</h4>
                      <p className="text-sm text-gray-600">PDF, 1.8 MB</p>
                    </div>
                    <div>
                      <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="mr-4">
                      <DocumentTextIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold">Conditions générales de vente</h4>
                      <p className="text-sm text-gray-600">PDF, 0.9 MB</p>
                    </div>
                    <div>
                      <ArrowDownTrayIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="bg-white">
        <div className="h-96 w-full bg-gray-300">
          {/* Intégration de carte Google Maps ici */}
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Questions fréquentes</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Retrouvez les réponses aux questions les plus courantes sur mes formations
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Combien coûte une formation WordPress ?</h3>
              <p className="text-gray-600">
                Le tarif varie en fonction de vos besoins spécifiques, de la durée de la formation et du nombre de participants. Je propose des formations sur-mesure adaptées à votre budget. N'hésitez pas à me contacter pour obtenir un devis personnalisé.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Les formations sont-elles éligibles aux financements professionnels ?</h3>
              <p className="text-gray-600">
                Oui, en tant que formateur certifié Qualiopi, mes formations sont éligibles aux financements des OPCO, du CPF et des autres dispositifs de financement de la formation professionnelle.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Faut-il avoir des connaissances techniques pour suivre une formation WordPress ?</h3>
              <p className="text-gray-600">
                Non, aucun prérequis technique n'est nécessaire. Mes formations s'adaptent à votre niveau, que vous soyez débutant ou que vous ayez déjà des bases en WordPress. L'objectif est justement de vous rendre autonome, quel que soit votre point de départ.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-2">Où se déroulent les formations ?</h3>
              <p className="text-gray-600">
                Les formations peuvent se dérouler dans vos locaux, à distance via visioconférence, ou dans un espace de coworking à Antibes. Je me déplace dans toute la région PACA (Alpes-Maritimes, Var, Bouches-du-Rhône).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
