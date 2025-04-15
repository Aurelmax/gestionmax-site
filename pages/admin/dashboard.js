import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import { 
  DocumentTextIcon, 
  NewspaperIcon, 
  UserGroupIcon, 
  FolderIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { getAllContentFiles } from '../../lib/mdx';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    formations: 0,
    blog: 0,
    testimonials: 0,
    projects: 0
  });

  // Récupérer les statistiques du contenu
  useEffect(() => {
    try {
      // En mode développement, on peut accéder au dashboard sans session
      if (status === 'unauthenticated' && process.env.NODE_ENV !== 'development') {
        router.push('/admin/login');
        return;
      }
      
      const formations = getAllContentFiles('formations');
      const blog = getAllContentFiles('blog');
      const testimonials = getAllContentFiles('testimonials');
      const projects = getAllContentFiles('projects');
      
      setStats({
        formations: formations.length,
        blog: blog.length,
        testimonials: testimonials.length,
        projects: projects.length
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  }, [status]);

  // Afficher un message de chargement pendant la vérification de l'authentification
  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  const statCards = [
    {
      name: 'Formations',
      count: stats.formations,
      icon: DocumentTextIcon,
      href: '/admin/formations',
      color: 'bg-primary-dark',
      addHref: '/admin/formations/new'
    },
    {
      name: 'Articles de blog',
      count: stats.blog,
      icon: NewspaperIcon,
      href: '/admin/blog',
      color: 'bg-secondary',
      addHref: '/admin/blog/new'
    },
    {
      name: 'Témoignages',
      count: stats.testimonials,
      icon: UserGroupIcon,
      href: '/admin/testimonials',
      color: 'bg-primary',
      addHref: '/admin/testimonials/new'
    },
    {
      name: 'Projets',
      count: stats.projects,
      icon: FolderIcon,
      href: '/admin/projects',
      color: 'bg-secondary-dark',
      addHref: '/admin/projects/new'
    }
  ];

  return (
    <AdminLayout title="Tableau de bord">
      <div className="mt-4">
        <h2 className="text-lg font-medium text-gray-900">Bienvenue, {session?.user?.name || 'Administrateur'}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Gérez le contenu de votre site Gestionmax depuis ce tableau de bord.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Aperçu du contenu</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${card.color} rounded-md p-3`}>
                    <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{card.count}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 flex justify-between">
                <div className="text-sm">
                  <Link href={card.href} className="font-medium text-primary hover:text-primary-dark">
                    Voir tout
                  </Link>
                </div>
                <div className="text-sm">
                  <Link href={card.addHref} className="font-medium text-primary hover:text-primary-dark flex items-center">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Ajouter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Actions rapides</h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/formations/new" className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
            <div className="flex-shrink-0 bg-primary rounded-md p-2">
              <DocumentTextIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Créer une formation</p>
              <p className="text-sm text-gray-500 truncate">Ajouter une nouvelle formation au catalogue</p>
            </div>
          </Link>

          <Link href="/admin/blog/new" className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
            <div className="flex-shrink-0 bg-secondary rounded-md p-2">
              <NewspaperIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Publier un article</p>
              <p className="text-sm text-gray-500 truncate">Rédiger un nouvel article de blog</p>
            </div>
          </Link>

          <Link href="/admin/settings" className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
            <div className="flex-shrink-0 bg-gray-500 rounded-md p-2">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Paramètres</p>
              <p className="text-sm text-gray-500 truncate">Configurer votre site</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900">Liens utiles</h3>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">Voir le site public</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        En ligne
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">Documentation Tailwind CSS</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">Documentation Next.js</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
