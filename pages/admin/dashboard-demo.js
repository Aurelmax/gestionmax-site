import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { 
  DocumentTextIcon, 
  NewspaperIcon, 
  UserGroupIcon, 
  FolderIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { getAllContentFiles } from '../../lib/mdx';

// Version simplifiée du composant AdminLayout
function SimpleAdminLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>{title} | Gestionmax Admin</title>
      </Head>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow pt-5 bg-primary-dark overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-xl font-bold text-white">Gestion<span className="text-secondary">max</span></span>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <Link href="/admin/dashboard-demo" className="text-white hover:bg-primary-light group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <svg className="mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Tableau de bord
                </Link>
                <Link href="/admin/formations" className="text-white hover:bg-primary-light group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <DocumentTextIcon className="mr-3 h-6 w-6 text-white" />
                  Formations
                </Link>
                <Link href="/admin/blog" className="text-white hover:bg-primary-light group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <NewspaperIcon className="mr-3 h-6 w-6 text-white" />
                  Blog
                </Link>
                <Link href="/admin/testimonials" className="text-white hover:bg-primary-light group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <UserGroupIcon className="mr-3 h-6 w-6 text-white" />
                  Témoignages
                </Link>
                <Link href="/admin/projects" className="text-white hover:bg-primary-light group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <FolderIcon className="mr-3 h-6 w-6 text-white" />
                  Projets
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardDemo() {
  const [stats, setStats] = useState({
    formations: 0,
    blog: 0,
    testimonials: 0,
    projects: 0
  });

  // Récupérer les statistiques du contenu
  useEffect(() => {
    try {
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
  }, []);

  const statCards = [
    {
      name: 'Formations',
      count: stats.formations,
      icon: DocumentTextIcon,
      href: '/admin/formations',
      color: 'bg-blue-500'
    },
    {
      name: 'Articles de blog',
      count: stats.blog,
      icon: NewspaperIcon,
      href: '/admin/blog',
      color: 'bg-green-500'
    },
    {
      name: 'Témoignages',
      count: stats.testimonials,
      icon: UserGroupIcon,
      href: '/admin/testimonials',
      color: 'bg-purple-500'
    },
    {
      name: 'Projets',
      count: stats.projects,
      icon: FolderIcon,
      href: '/admin/projects',
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      name: 'Nouvelle formation',
      href: '/admin/formations/new',
      icon: PlusIcon,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Nouvel article',
      href: '/admin/blog/new',
      icon: PlusIcon,
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Nouveau témoignage',
      href: '/admin/testimonials/new',
      icon: PlusIcon,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Nouveau projet',
      href: '/admin/projects/new',
      icon: PlusIcon,
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  return (
    <SimpleAdminLayout title="Tableau de bord (Démo)">
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Statistiques du contenu</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${card.color}`}>
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
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href={card.href} className="font-medium text-primary hover:text-primary-dark">
                    Voir tous
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
            >
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${action.color}`}>
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{action.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Liens utiles</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">
                      Voir le site public
                    </p>
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
              <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">
                      Documentation Next.js
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">
                      Documentation Tailwind CSS
                    </p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </SimpleAdminLayout>
  );
}
