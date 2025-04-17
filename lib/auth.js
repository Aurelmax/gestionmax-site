import { compare } from 'bcryptjs';

// Cette fonction vérifie les identifiants pour l'authentification
// Dans un environnement de développement, nous acceptons n'importe quel identifiant
export async function verifyCredentials(credentials) {
  // Logs de débogage pour l'authentification
  console.log('Tentative de connexion avec credentials:', credentials);
  console.log('Variables d\'environnement disponibles:', {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? 'Défini' : 'Non défini'
  });

  // En mode développement, accepter n'importe quel identifiant
  // En production, utilisez des variables d'environnement et une base de données
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  console.log('Mode environnement:', process.env.NODE_ENV);
  console.log('Tentative de connexion avec:', credentials.username);
  
  if (isDevelopment) {
    console.log('Mode développement: authentification automatique');
    // En développement, autoriser n'importe quel identifiant
    return {
      id: 1,
      name: 'Administrateur',
      email: 'admin@gestionmax.fr',
      role: 'admin',
    };
  }
  
  // Pour la production, utiliser la vérification normale
  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  
  console.log('Vérification avec username:', validUsername);
  console.log('Hash disponible:', validPasswordHash ? 'Oui' : 'Non');

  if (!validPasswordHash) {
    console.error('ERREUR: ADMIN_PASSWORD_HASH non défini dans les variables d\'environnement');
    return null;
  }

  try {
    if (
      credentials.username === validUsername &&
      await compare(credentials.password, validPasswordHash)
    ) {
      console.log('Authentification réussie');
      return {
        id: 1,
        name: 'Administrateur',
        email: 'admin@gestionmax.fr',
        role: 'admin',
      };
    }
    
    console.log('Échec de l\'authentification: identifiants incorrects');
    return null;
  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    return null;
  }
}

// Fonction pour vérifier le token d'authentification dans les requêtes API
export async function verifyToken(req) {
  // En mode développement, autoriser toutes les requêtes
  if (process.env.NODE_ENV === 'development') {
    return {
      id: 1,
      name: 'Administrateur',
      email: 'admin@gestionmax.fr',
      role: 'admin',
    };
  }
  
  // En production, vérifier le token/session
  // Cette implémentation est simplifiée et devrait être remplacée par une vérification réelle
  // des sessions ou des tokens JWT selon votre système d'authentification
  
  // Exemple avec un token dans les headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  // Vérification simplifiée - à remplacer par une vérification réelle
  // const token = authHeader.split(' ')[1];
  // Vérifier le token...
  
  // Pour l'instant, retourner un utilisateur fictif si le header existe
  return {
    id: 1,
    name: 'Administrateur',
    email: 'admin@gestionmax.fr',
    role: 'admin',
  };
} 