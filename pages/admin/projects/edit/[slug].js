import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/AdminLayout';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowDownOnSquareIcon as SaveIcon } from '@heroicons/react/24/outline';
import { getContentBySlug } from '../../../../lib/mdx';
import MediaSelector from '../../../../components/MediaSelector';

export default function EditProject() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    image: null,
    gallery: [],
    url: '',
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
      const fetchProject = async () => {
        try {
          setIsLoading(true);
          const project = await getContentBySlug('projects', slug);
          
          if (project) {
            // Convertir les chemins d'images de la galerie en objets pour le sélecteur d'images
            const galleryImages = Array.isArray(project.frontmatter.gallery) 
              ? project.frontmatter.gallery.map(path => ({
                  url: path,
                  filename: path.split('/').pop()
                }))
              : [];
              
            // Convertir le chemin d'image en objet pour le sélecteur d'images
            const mainImage = project.frontmatter.image 
              ? {
                  url: project.frontmatter.image,
                  filename: project.frontmatter.image.split('/').pop()
                }
              : null;
              
            setFormData({
              title: project.frontmatter.title || '',
              client: project.frontmatter.client || '',
              category: project.frontmatter.category || '',
              date: project.frontmatter.date ? new Date(project.frontmatter.date).toISOString().split('T')[0] : '',
              image: mainImage,
              gallery: galleryImages,
              url: project.frontmatter.url || '',
              featured: project.frontmatter.featured || false,
              description: project.frontmatter.description || '',
              content: project.content || ''
            });
          } else {
            setError('Projet non trouvé');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du projet:', error);
          setError('Erreur lors de la récupération du projet');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchProject();
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Préparer les images de la galerie pour le frontmatter
      const galleryArray = formData.gallery.map(img => img.url);
      
      // Générer le contenu du fichier Markdown
      const frontmatter = `---
title: "${formData.title}"
client: "${formData.client}"
category: "${formData.category}"
date: "${formData.date}"
image: "${formData.image ? formData.image.url : ''}"
gallery: [${galleryArray.map(img => `"${img}"`).join(', ')}]
url: "${formData.url}"
featured: ${formData.featured}
description: "${formData.description}"
---

${formData.content}`;

      // Dans une implémentation réelle, vous appelleriez une API pour enregistrer le fichier
      // Ici, nous simulons juste le succès
      console.log('Contenu du fichier Markdown à mettre à jour:', frontmatter);
      
      // Simuler un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Projet mis à jour avec succès ! Dans une implémentation réelle, le fichier Markdown serait mis à jour.');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
      setError('Une erreur est survenue lors de la mise à jour du projet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (image) => {
    setFormData({
      ...formData,
      image
    });
  };

  const handleAddToGallery = (image) => {
    setFormData({
      ...formData,
      gallery: [...formData.gallery, image]
    });
  };

  const handleRemoveFromGallery = (index) => {
    const newGallery = [...formData.gallery];
    newGallery.splice(index, 1);
    setFormData({
      ...formData,
      gallery: newGallery
    });
  };

  const categoryOptions = [
    'Site vitrine',
    'E-commerce',
    'Blog',
    'Formation',
    'Application web',
    'Refonte',
    'Optimisation',
    'SEO'
  ];

  if (isLoading) {
    return (
      <AdminLayout title="Modification de projet">
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
                  onClick={() => router.push('/admin/projects')}
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
              <h2 className="text-lg font-medium text-gray-900">Informations du projet</h2>
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
                  <span className="text-sm text-gray-500">
                    Client: {formData.client}
                  </span>
                  <span className="px-2 py-1 bg-primary-light/20 text-primary-dark text-sm rounded-full">
                    {formData.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(formData.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                {formData.image && (
                  <div className="my-4">
                    <img src={formData.image.url} alt={formData.title} className="rounded-lg max-h-80 object-cover" />
                  </div>
                )}
                <p className="text-lg font-medium">{formData.description}</p>
                <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br>') }} />
                {formData.url && (
                  <div className="mt-4">
                    <a href={formData.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                      Voir le site
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre du projet *
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

                <div className="sm:col-span-3">
                  <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                    Client *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="client"
                      id="client"
                      required
                      value={formData.client}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
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

                <div className="sm:col-span-3">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date de réalisation *
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    URL du site
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="url"
                      id="url"
                      placeholder="https://exemple.com"
                      value={formData.url}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Image principale
                  </label>
                  <div className="mt-1">
                    <MediaSelector
                      onSelect={handleImageSelect}
                      selectedImage={formData.image}
                      buttonLabel="Sélectionner une image principale"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Galerie d'images
                  </label>
                  <div className="mt-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                      {formData.gallery.map((galleryImage, index) => (
                        <div key={index} className="relative border rounded-md overflow-hidden group">
                          <div className="aspect-w-1 aspect-h-1 w-full">
                            <img
                              src={galleryImage.url}
                              alt={galleryImage.filename || `Image ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFromGallery(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <MediaSelector
                      onSelect={handleAddToGallery}
                      selectedImage={null}
                      buttonLabel="Ajouter une image à la galerie"
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
                      <p className="text-gray-500">Ce projet sera mis en avant sur la page d'accueil.</p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description courte *
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
                    Brève description du projet qui apparaîtra dans les listes et les aperçus.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Contenu détaillé (Markdown) *
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
                    Utilisez la syntaxe Markdown pour formater le contenu détaillé du projet.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.push('/admin/projects')}
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
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
