import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import {
  HomeIcon,
  DocumentTextIcon,
  NewspaperIcon,
  UserGroupIcon,
  FolderIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  PhotoIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const AdminLayout = ({ children, title }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Rediriger vers la page de connexion si non authentifié
  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  // Afficher un écran de chargement pendant la vérification de l'authentification
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  const navigation = [
    { name: 'Tableau de bord', href: '/admin/dashboard', icon: HomeIcon, current: router.pathname === '/admin/dashboard' },
    { name: 'Formations', href: '/admin/formations', icon: DocumentTextIcon, current: router.pathname.startsWith('/admin/formations') },
    { name: 'Blog', href: '/admin/blog', icon: NewspaperIcon, current: router.pathname.startsWith('/admin/blog') },
    { name: 'Témoignages', href: '/admin/testimonials', icon: UserGroupIcon, current: router.pathname.startsWith('/admin/testimonials') },
    { name: 'Projets', href: '/admin/projects', icon: FolderIcon, current: router.pathname.startsWith('/admin/projects') },
    { name: 'Médias', href: '/admin/media', icon: PhotoIcon, current: router.pathname.startsWith('/admin/media') },
    { name: 'Apprenants', href: '/admin/learners', icon: AcademicCapIcon, current: router.pathname.startsWith('/admin/learners') },
    { name: 'Paramètres', href: '/admin/settings', icon: Cog6ToothIcon, current: router.pathname === '/admin/settings' },
  ];

  return (
    <>
      <Head>
        <title>{title ? `${title} | Admin Gestionmax` : 'Admin Gestionmax'}</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar mobile */}
        <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-dark">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <span className="text-2xl font-bold text-white">Gestion<span className="text-secondary-light">max</span></span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      item.current
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-primary hover:text-white'
                    }`}
                  >
                    <item.icon className="mr-4 h-6 w-6 text-gray-300" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <button
                onClick={handleSignOut}
                className="flex-shrink-0 group block w-full"
              >
                <div className="flex items-center">
                  <div>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-300" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-white">Déconnexion</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-primary-dark">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-2xl font-bold text-white">Gestion<span className="text-secondary-light">max</span></span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      item.current
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-primary hover:text-white'
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6 text-gray-300" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <button
                onClick={handleSignOut}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-300" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Déconnexion</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 pb-10">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {title && (
                  <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                )}
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-4">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
