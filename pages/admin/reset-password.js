import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Récupérer le token de l'URL
    if (router.query.token) {
      setToken(router.query.token);
    }
    
    // Email de l'administrateur (en production, utilisez une base de données)
    setEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@gestionmax.fr');
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setMessage(data.message);
      setPasswordHash(data.passwordHash);
      setShowInstructions(true);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Réinitialisation du mot de passe | GestionMax</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Réinitialisation du mot de passe
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Entrez votre nouveau mot de passe
            </p>
          </div>
          
          {!showInstructions ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="password" className="sr-only">
                    Nouveau mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={8}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              {message && !showInstructions && (
                <div className="text-green-500 text-sm text-center">{message}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || !token}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="bg-green-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Mot de passe réinitialisé avec succès
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Votre mot de passe a été réinitialisé. Pour terminer la configuration, vous devez mettre à jour votre fichier .env.local avec le nouveau hash de mot de passe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  Instructions pour mettre à jour votre fichier .env.local :
                </h4>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                  <li>Ouvrez votre fichier .env.local</li>
                  <li>Remplacez la ligne ADMIN_PASSWORD_HASH par le nouveau hash :</li>
                  <div className="bg-gray-100 p-2 rounded mt-1 mb-2 overflow-auto">
                    <code className="text-xs">
                      ADMIN_PASSWORD_HASH={passwordHash}
                    </code>
                  </div>
                  <li>Sauvegardez le fichier</li>
                  <li>Redémarrez votre serveur si nécessaire</li>
                </ol>
              </div>
              
              <div className="text-center mt-6">
                <Link href="/admin/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Retour à la page de connexion
                </Link>
              </div>
            </div>
          )}
          
          {!showInstructions && (
            <div className="text-center mt-4">
              <Link href="/admin/login" className="text-sm text-indigo-600 hover:text-indigo-500">
                Retour à la page de connexion
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}