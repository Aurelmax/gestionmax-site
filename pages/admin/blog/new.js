import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowDownOnSquareIcon as SaveIcon } from '@heroicons/react/24/outline';
import MediaSelector from '../../../components/MediaSelector';

export default function NewBlogPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Aurélien Lavayssière',
    category: '',
    tags: '',
    image: null,
    excerpt: '',
    content: `# Titre de l'article

Commencez votre article ici...

## Sous-titre 1

Contenu de la première section...

## Sous-titre 2

Contenu de la deuxième section...

### Points importants

- Point 1
- Point 2
- Point 3

## Conclusion

Résumez votre article ici...`
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const generateSlug = (title) => {
    return title
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
      // Générer un slug à partir du titre
      const slug = generateSlug(formData.title);
      
      // Préparer les tags pour le frontmatter
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      // Générer le contenu du fichier Markdown
      const frontmatter = `---
title: "${formData.title}"
date: "${formData.date}"
author: "${formData.author}"
category: "${formData.category}"
tags: [${tagsArray.map(tag => `"${tag}"`).join(', ')}]
image: "${formData.image}"
excerpt: "${formData.excerpt}"
---

${formData.content}`;

      // Dans une implémentation réelle, vous appelleriez une API pour enregistrer le fichier
      // Ici, nous simulons juste le succès
      console.log('Contenu du fichier Markdown à enregistrer:', frontmatter);
      
      // Simuler un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Article créé avec succès ! Dans une implémentation réelle, un fichier Markdown serait créé.');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      setError('Une erreur est survenue lors de la création de l\'article.');
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

  const categoryOptions = [
    'WordPress',
    'SEO',
    'Marketing',
    'E-commerce',
    'Design',
    'Réseaux Sociaux',
    'Tutoriels',
    'Astuces',
    'Actualités',
    'IA',
    'Automatisation'
  ];

  return (
    <AdminLayout title="Nouvel article">
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
              <h2 className="text-lg font-medium text-gray-900">Informations de l'article</h2>
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
                    {new Date(formData.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="text-sm text-gray-500">
                    • Par {formData.author}
                  </span>
                  <span className="px-2 py-1 bg-primary-light/20 text-primary-dark text-sm rounded-full">
                    {formData.category}
                  </span>
                </div>
                {formData.image && (
                  <div className="my-4">
                    <img src={formData.image} alt={formData.title} className="rounded-lg max-h-80 object-cover" />
                  </div>
                )}
                <p className="text-lg font-medium">{formData.excerpt}</p>
                <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br>') }} />
                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
                    tag.trim() && (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        #{tag.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre de l'article *
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
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date de publication *
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
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Auteur *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="author"
                      id="author"
                      required
                      value={formData.author}
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
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (séparés par des virgules)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      placeholder="ex: wordpress, seo, tutoriel"
                      value={formData.tags}
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
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                    Extrait *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      rows={3}
                      required
                      value={formData.excerpt}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brève description de l'article qui apparaîtra dans les listes et les aperçus.
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
                    Utilisez la syntaxe Markdown pour formater le contenu de l'article.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.push('/admin/blog')}
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
