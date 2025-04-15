import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/AdminLayout';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowDownOnSquareIcon as SaveIcon } from '@heroicons/react/24/outline';
import { getContentBySlug } from '../../../../lib/mdx';
import MediaSelector from '../../../../components/MediaSelector';

export default function EditFormation() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [formData, setFormData] = useState({
    title: '',
    id: '',
    category: '',
    level: '',
    duration: '',
    price: '',
    image: null,
    featured: false,
    description: '',
    content: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (slug) {
      try {
        // Récupérer les données de la formation
        const formation = getContentBySlug('formations', slug);
        
        // Mettre à jour l'état avec les données de la formation
        setFormData({
          title: formation.frontmatter.title || '',
          id: formation.frontmatter.id || '',
          category: formation.frontmatter.category || '',
          level: formation.frontmatter.level || '',
          duration: formation.frontmatter.duration || '',
          price: formation.frontmatter.price || '',
          image: formation.frontmatter.image || null,
          featured: formation.frontmatter.featured || false,
          description: formation.frontmatter.description || '',
          content: formation.content || ''
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération de la formation:', error);
        setError('Formation non trouvée ou erreur lors du chargement.');
        setIsLoading(false);
      }
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageSelect = (image) => {
    setFormData({
      ...formData,
      image
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Générer le contenu du fichier Markdown
      const frontmatter = `---
title: "${formData.title}"
id: "${formData.id}"
category: "${formData.category}"
level: "${formData.level}"
duration: "${formData.duration}"
price: "${formData.price}"
image: "${formData.image}"
featured: ${formData.featured}
description: "${formData.description}"
---

${formData.content}`;

      // Dans une implémentation réelle, vous appelleriez une API pour enregistrer le fichier
      // Ici, nous simulons juste le succès
      console.log('Contenu du fichier Markdown à mettre à jour:', frontmatter);
      
      // Simuler un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Formation mise à jour avec succès ! Dans une implémentation réelle, le fichier Markdown serait mis à jour.');
      router.push('/admin/formations');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la formation:', error);
      setError('Une erreur est survenue lors de la mise à jour de la formation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    'WordPress',
    'SEO',
    'Marketing',
    'E-commerce',
    'Design',
    'Réseaux Sociaux',
    'IA',
    'Automatisation'
  ];

  const levelOptions = [
    'Débutant',
    'Intermédiaire',
    'Avancé',
    'Débutant à intermédiaire',
    'Intermédiaire à avancé',
    'Tous niveaux'
  ];

  if (isLoading) {
    return (
      <AdminLayout title="Modification de formation">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error && !formData.title) {
    return (
      <AdminLayout title="Erreur">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/formations')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Retour à la liste
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Modifier : ${formData.title}`}>
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
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Informations de la formation</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {preview ? 'Éditer' : 'Aperçu'}
                </button>
              </div>
            </div>
          </div>

          {preview ? (
            <div className="p-6">
              <div className="prose max-w-none">
                <h1>{formData.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-primary-light/20 text-primary-dark text-sm rounded-full">
                    {formData.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    {formData.level}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    {formData.duration}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    {formData.price}
                  </span>
                </div>
                <p className="text-lg">{formData.description}</p>
                <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br>') }} />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre de la formation *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                    ID de la formation *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="id"
                      id="id"
                      required
                      placeholder="ex: A001-WP-DD"
                      value={formData.id}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Catégorie *
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Niveau
                  </label>
                  <div className="mt-1">
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Sélectionner un niveau</option>
                      {levelOptions.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Durée
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="duration"
                      id="duration"
                      placeholder="ex: 21 heures (3 jours)"
                      value={formData.duration}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Prix
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      placeholder="ex: 1800€"
                      value={formData.price}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Image de couverture
                  </label>
                  <div className="mt-1">
                    <MediaSelector
                      onSelect={handleImageSelect}
                      selectedImage={formData.image}
                      buttonLabel="Sélectionner une image de couverture"
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
                      <p className="text-gray-500">Cette formation sera mise en avant sur la page d'accueil.</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brève description de la formation qui apparaîtra dans les listes et les aperçus.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Contenu (Markdown) *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      name="content"
                      rows={20}
                      required
                      value={formData.content}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md font-mono"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Utilisez la syntaxe Markdown pour formater le contenu de la formation.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.push('/admin/formations')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <ArrowDownOnSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
