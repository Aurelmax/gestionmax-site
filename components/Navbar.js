import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-dark">Gestion<span className="text-secondary">max</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">
              Accueil
            </Link>
            <Link href="/formations" className="text-gray-700 hover:text-primary font-medium">
              Formations
            </Link>
            <Link href="/a-propos" className="text-gray-700 hover:text-primary font-medium">
              À propos
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary font-medium">
              Actualités
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn btn-primary">
              Personnaliser votre formation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-700 hover:text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
                Accueil
              </Link>
              <Link href="/formations" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
                Formations
              </Link>
              <Link href="/a-propos" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
                À propos
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
                Actualités
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary font-medium px-4 py-2">
                Contact
              </Link>
              <Link href="/contact" className="btn btn-primary mx-4">
                Personnaliser votre formation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
