import { compare } from 'bcryptjs';

// Cette fonction vérifie les identifiants pour l'authentification
// Dans un environnement de développement, nous acceptons n'importe quel identifiant
export async function verifyCredentials(credentials) {
  // En mode développement, accepter n'importe quel identifiant
  // En production, utilisez des variables d'environnement et une base de données
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
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
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2a$12$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS'; // "adminpassword"

  if (
    credentials.username === validUsername &&
    await compare(credentials.password, validPasswordHash)
  ) {
    return {
      id: 1,
      name: 'Administrateur',
      email: 'admin@gestionmax.fr',
      role: 'admin',
    };
  }

  return null;
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
