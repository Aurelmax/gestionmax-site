import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';

export default function LearnerEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Rediriger vers la page de connexion si non authentifié
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    // Charger les données de l'apprenant si en mode édition
    if (status === 'authenticated' && id) {
      fetchLearnerData(id);
    }
  }, [status, router, id]);

  const fetchLearnerData = async (learnerId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/learners/${learnerId}`);
      const data = await response.json();
      
      if (data.success && data.learner) {
        setFormData({
          name: data.learner.name || '',
          email: data.learner.email || '',
          phone: data.learner.phone || '',
          address: data.learner.address || '',
          notes: data.learner.notes || ''
        });
      } else {
        setError('Impossible de charger les données de l\'apprenant');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError('Une erreur est survenue lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const url = isEditMode ? `/api/learners/${id}` : '/api/learners';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(isEditMode ? 'Apprenant mis à jour avec succès' : 'Apprenant créé avec succès');
        
        // Rediriger vers la liste après un court délai
        setTimeout(() => {
          router.push('/admin/learners');
        }, 2000);
      } else {
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setError('Une erreur est survenue lors de la soumission du formulaire');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || (isEditMode && loading && !formData.name)) {
    return (
      <AdminLayout title={isEditMode ? "Modifier un apprenant" : "Ajouter un apprenant"}>
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? "Modifier un apprenant" : "Ajouter un apprenant"}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Modifier un apprenant" : "Ajouter un apprenant"}
          </h1>
          <button 
            onClick={() => router.push('/admin/learners')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Retour à la liste
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Adresse
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
              ></textarea>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? 'Traitement...' : (isEditMode ? 'Mettre à jour' : 'Créer')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}