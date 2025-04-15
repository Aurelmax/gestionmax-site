import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { XMarkIcon, MagnifyingGlassIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

const MediaSelector = ({ onSelect, selectedImage, buttonLabel = "Sélectionner une image" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const modalRef = useRef(null);

  // Charger les images lorsque le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  // Fermer le modal en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
        
        // Sélectionner automatiquement l'image qui vient d'être téléchargée
        handleSelectImage(data.file);
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

  // Sélectionner une image
  const handleSelectImage = (image) => {
    onSelect(image);
    setIsOpen(false);
  };

  // Supprimer la sélection
  const handleClearSelection = () => {
    onSelect(null);
  };

  return (
    <div className="space-y-2">
      {/* Aperçu de l'image sélectionnée */}
      {selectedImage && (
        <div className="relative border rounded-md p-2 bg-gray-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded-md">
              <Image
                src={selectedImage.url}
                alt={selectedImage.originalname || selectedImage.filename}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate" title={selectedImage.originalname || selectedImage.filename}>
                {selectedImage.originalname || selectedImage.filename}
              </p>
              <button
                type="button"
                onClick={handleClearSelection}
                className="mt-1 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XMarkIcon className="-ml-0.5 mr-1 h-4 w-4" aria-hidden="true" />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton pour ouvrir le sélecteur */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        {buttonLabel}
      </button>

      {/* Modal de sélection d'image */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Sélectionner une image</h3>
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Fermer</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="px-4 py-3 flex justify-between items-center bg-gray-50 border-b">
              <div className="relative flex-1 max-w-xs">
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
                <label htmlFor="media-file-upload" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
                  <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Télécharger
                </label>
                <input
                  id="media-file-upload"
                  name="media-file-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
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

            {error && (
              <div className="px-4 py-3 bg-red-50">
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

            <div className="flex-1 overflow-y-auto p-4">
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredImages.map((image) => (
                    <div
                      key={image.filename}
                      className="relative group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                      onClick={() => handleSelectImage(image)}
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
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSelector;
