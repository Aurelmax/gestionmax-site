import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/AdminLayout';
import { 
  ArrowLeftIcon, 
  DocumentArrowUpIcon, 
  DocumentTextIcon, 
  DocumentCheckIcon, 
  DocumentChartBarIcon,
  CurrencyEuroIcon,
  ClipboardDocumentCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { DOCUMENT_TYPES } from '../../../../lib/learners';

export default function LearnerDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const [learner, setLearner] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  // Charger les données de l'apprenant et ses documents
  useEffect(() => {
    if (id) {
      fetchLearnerData();
    }
  }, [id]);

  // Récupérer les données de l'apprenant et ses documents
  const fetchLearnerData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/learners/${id}/documents`);
      const data = await response.json();

      if (data.success) {
        setLearner(data.learner);
        setDocuments(data.documents);
      } else {
        setError(data.message || 'Erreur lors de la récupération des données');
      }
    } catch (error) {
      setError('Erreur lors de la récupération des données');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gérer le téléchargement d'un document
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadFile || !uploadType) {
      setUploadError('Veuillez sélectionner un fichier et un type de document');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('document', uploadFile);
      formData.append('type', uploadType);

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

      const response = await fetch(`/api/learners/${id}/upload`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (data.success) {
        // Ajouter le nouveau document à la liste
        setDocuments([data.document, ...documents]);
        setUploadModalOpen(false);
        setUploadFile(null);
        setUploadType('');
      } else {
        setUploadError(data.message || 'Erreur lors du téléchargement du document');
      }
    } catch (error) {
      setUploadError('Erreur lors du téléchargement du document');
      console.error('Erreur:', error);
    } finally {
      setUploading(false);
      // Réinitialiser la progression après un court délai
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    }
  };

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Obtenir le libellé du statut
  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'in_progress':
        return 'En cours';
      case 'upcoming':
        return 'À venir';
      default:
        return 'Inconnu';
    }
  };

  // Obtenir la classe CSS du statut
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Obtenir l'icône pour un type de document
  const getDocumentIcon = (type) => {
    switch (type) {
      case DOCUMENT_TYPES.DEVIS:
        return <CurrencyEuroIcon className="h-8 w-8 text-primary" />;
      case DOCUMENT_TYPES.CONVENTION:
        return <DocumentTextIcon className="h-8 w-8 text-blue-500" />;
      case DOCUMENT_TYPES.FACTURE:
        return <DocumentChartBarIcon className="h-8 w-8 text-green-500" />;
      case DOCUMENT_TYPES.EMARGEMENT:
        return <ClipboardDocumentCheckIcon className="h-8 w-8 text-yellow-500" />;
      case DOCUMENT_TYPES.CERTIFICAT:
        return <DocumentCheckIcon className="h-8 w-8 text-purple-500" />;
      case DOCUMENT_TYPES.BILAN:
        return <DocumentTextIcon className="h-8 w-8 text-red-500" />;
      default:
        return <DocumentTextIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  // Obtenir le libellé d'un type de document
  const getDocumentTypeLabel = (type) => {
    switch (type) {
      case DOCUMENT_TYPES.DEVIS:
        return 'Devis';
      case DOCUMENT_TYPES.CONVENTION:
        return 'Convention';
      case DOCUMENT_TYPES.FACTURE:
        return 'Facture';
      case DOCUMENT_TYPES.EMARGEMENT:
        return 'Feuille d\'émargement';
      case DOCUMENT_TYPES.CERTIFICAT:
        return 'Certificat de réalisation';
      case DOCUMENT_TYPES.BILAN:
        return 'Bilan de fin de formation';
      default:
        return 'Document';
    }
  };

  // Formater la taille du fichier
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Grouper les documents par type
  const groupedDocuments = documents.reduce((acc, document) => {
    if (!acc[document.type]) {
      acc[document.type] = [];
    }
    acc[document.type].push(document);
    return acc;
  }, {});

  return (
    <AdminLayout title={learner ? `Documents de ${learner.name}` : "Détails de l'apprenant"}>
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

      <div className="mb-4">
        <button
          type="button"
          onClick={() => router.push('/admin/learners')}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <ArrowLeftIcon className="-ml-1 mr-1 h-5 w-5 text-gray-500" aria-hidden="true" />
          Retour à la liste
        </button>
      </div>

      {loading ? (
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      ) : learner ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Informations de l'apprenant</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Détails personnels et documents</p>
            </div>
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <DocumentArrowUpIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Ajouter un document
            </button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{learner.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{learner.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Entreprise</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{learner.company}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{learner.phone}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Formation</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{learner.formation}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Période</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(learner.startDate)} - {formatDate(learner.endDate)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Statut</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(learner.status)}`}>
                    {getStatusLabel(learner.status)}
                  </span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 mb-4">Documents</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {documents.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="mt-2 text-sm text-gray-500">Aucun document disponible</p>
                      <p className="text-xs text-gray-400">Cliquez sur "Ajouter un document" pour télécharger des documents</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(DOCUMENT_TYPES).map(([key, type]) => {
                        const typeDocuments = groupedDocuments[type] || [];
                        return (
                          <div key={type} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                              <h3 className="text-sm font-medium text-gray-700">{getDocumentTypeLabel(type)}</h3>
                              <span className="text-xs text-gray-500">{typeDocuments.length} document(s)</span>
                            </div>
                            {typeDocuments.length === 0 ? (
                              <div className="p-4 text-center text-sm text-gray-500">
                                Aucun document de ce type
                              </div>
                            ) : (
                              <ul className="divide-y divide-gray-200">
                                {typeDocuments.map((document) => (
                                  <li key={document.id} className="px-4 py-3 flex items-center hover:bg-gray-50">
                                    <div className="flex-shrink-0">
                                      {getDocumentIcon(document.type)}
                                    </div>
                                    <div className="ml-4 flex-1">
                                      <div className="text-sm font-medium text-gray-900">{document.originalname}</div>
                                      <div className="text-xs text-gray-500">
                                        {formatFileSize(document.size)} • Ajouté le {formatDate(document.createdAt)}
                                      </div>
                                    </div>
                                    <div>
                                      <a
                                        href={document.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                      >
                                        Voir
                                      </a>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
          <p className="text-gray-500">Apprenant non trouvé</p>
        </div>
      )}

      {/* Modal de téléchargement */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Ajouter un document</h3>
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setUploadModalOpen(false)}
              >
                <span className="sr-only">Fermer</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="px-4 py-5 sm:p-6">
              {uploadError && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{uploadError}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="document-type" className="block text-sm font-medium text-gray-700">
                    Type de document
                  </label>
                  <select
                    id="document-type"
                    name="document-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    required
                  >
                    <option value="">Sélectionner un type</option>
                    <option value={DOCUMENT_TYPES.DEVIS}>Devis</option>
                    <option value={DOCUMENT_TYPES.CONVENTION}>Convention</option>
                    <option value={DOCUMENT_TYPES.FACTURE}>Facture</option>
                    <option value={DOCUMENT_TYPES.EMARGEMENT}>Feuille d'émargement</option>
                    <option value={DOCUMENT_TYPES.CERTIFICAT}>Certificat de réalisation</option>
                    <option value={DOCUMENT_TYPES.BILAN}>Bilan de fin de formation</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="document-file" className="block text-sm font-medium text-gray-700">
                    Fichier
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                          <span>Télécharger un fichier</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setUploadFile(e.target.files[0])}
                            required
                          />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX jusqu'à 10MB</p>
                      {uploadFile && (
                        <p className="text-sm text-gray-700 mt-2">
                          Fichier sélectionné: <span className="font-medium">{uploadFile.name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {uploading && (
                <div className="mt-4">
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

              <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => setUploadModalOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={uploading || !uploadFile || !uploadType}
                >
                  {uploading ? 'Téléchargement...' : 'Télécharger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
