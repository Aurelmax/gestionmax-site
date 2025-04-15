import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import { PlusIcon, TrashIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function MediaLibrary() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Charger les images au chargement de la page
  useEffect(() => {
    fetchImages();
  }, []);

  // Récupérer la liste des images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/media/list');
      const data = await response.json();

      if (data.success) {
        setImages(data.images);
      } else {
        setError(data.message || 'Erreur lors de la récupération des images');
      }
    } catch (error) {
      setError('Erreur lors de la récupération des images');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la suppression d'une image
  const handleDeleteImage = async (filename) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/media/delete?filename=${filename}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        // Mettre à jour la liste des images
        setImages(images.filter(image => image.filename !== filename));
        
        // Si l'image supprimée était sélectionnée, désélectionner
        if (selectedImage && selectedImage.filename === filename) {
          setSelectedImage(null);
        }
      } else {
        setError(data.message || 'Erreur lors de la suppression de l\'image');
      }
    } catch (error) {
      setError('Erreur lors de la suppression de l\'image');
      console.error('Erreur:', error);
    }
  };

  // Gérer le téléchargement d'une image
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Seules les images sont autorisées');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La taille du fichier ne doit pas dépasser 5MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Simuler la progression du téléchargement
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (data.success) {
        // Ajouter la nouvelle image à la liste
        setImages([data.file, ...images]);
        setError(null);
      } else {
        setError(data.message || 'Erreur lors du téléchargement de l\'image');
      }
    } catch (error) {
      setError('Erreur lors du téléchargement de l\'image');
      console.error('Erreur:', error);
    } finally {
      setUploading(false);
      // Réinitialiser la progression après un court délai
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    }
  };

  // Filtrer les images en fonction du terme de recherche
  const filteredImages = searchTerm
    ? images.filter(image => 
        image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (image.originalname && image.originalname.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : images;

  // Formater la taille du fichier
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout title="Bibliothèque de médias">
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Bibliothèque de médias</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Gérez vos images et autres médias</p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="file-upload" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Ajouter une image
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </div>
          </div>
        </div>

        {uploading && (
          <div className="px-4 py-3 bg-gray-50">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{uploadProgress}%</span>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des images...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Aucune image trouvée</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {filteredImages.map((image) => (
                <div
                  key={image.filename}
                  className={`relative group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
                    selectedImage && selectedImage.filename === image.filename ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={image.url}
                      alt={image.originalname || image.filename}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-2 text-xs truncate" title={image.originalname || image.filename}>
                    {image.originalname || image.filename}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(image.filename);
                      }}
                      className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mx-1"
                      title="Supprimer"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <a
                      href={image.url}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-1"
                      title="Télécharger"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Détails de l'image</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nom du fichier</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedImage.originalname || selectedImage.filename}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">URL</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <a href={selectedImage.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                    {selectedImage.url}
                  </a>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Taille</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatFileSize(selectedImage.size)}</dd>
              </div>
              {selectedImage.createdAt && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(selectedImage.createdAt)}</dd>
                </div>
              )}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Code pour insertion</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <code className="bg-gray-100 p-2 rounded block overflow-x-auto">
                    {`<Image src="${selectedImage.url}" alt="Description" width={800} height={600} />`}
                  </code>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Aperçu</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg">
                    <Image
                      src={selectedImage.url}
                      alt={selectedImage.originalname || selectedImage.filename}
                      width={400}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
