import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowDownOnSquareIcon as SaveIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline';

export default function NewTestimonial() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    avatar: '',
    rating: 5,
    text: '',
    featured: false,
    formation: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating
    });
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Générer un slug à partir du nom
      const slug = generateSlug(formData.name);
      
      // Générer le contenu du fichier Markdown
      const frontmatter = `---
name: "${formData.name}"
company: "${formData.company}"
position: "${formData.position}"
avatar: "${formData.avatar}"
rating: ${formData.rating}
text: "${formData.text.replace(/"/g, '\\"')}"
featured: ${formData.featured}
formation: "${formData.formation}"
date: "${formData.date}"
---`;

      // Dans une implémentation réelle, vous appelleriez une API pour enregistrer le fichier
      // Ici, nous simulons juste le succès
      console.log('Contenu du fichier Markdown à enregistrer:', frontmatter);
      
      // Simuler un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Témoignage créé avec succès ! Dans une implémentation réelle, un fichier Markdown serait créé.');
      router.push('/admin/testimonials');
    } catch (error) {
      console.error('Erreur lors de la création du témoignage:', error);
      setError('Une erreur est survenue lors de la création du témoignage.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Liste des formations pour le select
  const formationOptions = [
    { id: 'wp-debutant', name: 'WordPress pour débutants' },
    { id: 'wp-avance', name: 'WordPress avancé' },
    { id: 'woocommerce', name: 'E-commerce avec WooCommerce' },
    { id: 'seo', name: 'Référencement WordPress' },
    { id: 'securite', name: 'Sécuriser son site WordPress' }
  ];

  return (
    <AdminLayout title="Nouveau témoignage">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Informations du témoignage</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom du client *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Entreprise
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Poste / Fonction
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date du témoignage
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                  Avatar (chemin)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="avatar"
                    id="avatar"
                    placeholder="/images/testimonials/nom-image.jpg"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Indiquez le chemin de l'avatar. Vous pourrez télécharger l'image ultérieurement.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Note
                </label>
                <div className="mt-1 flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none"
                    >
                      <StarIcon
                        className={`h-6 w-6 ${
                          star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="formation" className="block text-sm font-medium text-gray-700">
                  Formation concernée
                </label>
                <div className="mt-1">
                  <select
                    id="formation"
                    name="formation"
                    value={formData.formation}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Sélectionner une formation (optionnel)</option>
                    {formationOptions.map((formation) => (
                      <option key={formation.id} value={formation.id}>{formation.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                  Témoignage *
                </label>
                <div className="mt-1">
                  <textarea
                    id="text"
                    name="text"
                    rows={5}
                    required
                    value={formData.text}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="featured" className="font-medium text-gray-700">Mettre en avant</label>
                    <p className="text-gray-500">Ce témoignage sera mis en avant sur la page d'accueil.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/testimonials')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <SaveIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
