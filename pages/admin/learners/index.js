import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';

export default function LearnersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rediriger vers la page de connexion si non authentifié
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    // Charger la liste des apprenants
    if (status === 'authenticated') {
      fetchLearners();
    }
  }, [status, router]);

  const fetchLearners = async () => {
    try {
      const response = await fetch('/api/learners');
      const data = await response.json();
      
      if (data.success) {
        setLearners(data.learners || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des apprenants:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <AdminLayout title="Gestion des apprenants">
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gestion des apprenants">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Liste des apprenants</h1>
          <button 
            onClick={() => router.push('/admin/learners/edit')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ajouter un apprenant
          </button>
        </div>

        {learners.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p>Aucun apprenant trouvé</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'inscription</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {learners.map((learner) => (
                  <tr key={learner.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{learner.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{learner.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(learner.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => router.push(`/admin/learners/edit?id=${learner.id}`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Modifier
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}