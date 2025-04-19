// lib/auth.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

/**
 * Vérifie si l'utilisateur est authentifié via NextAuth
 * Remplace l'ancienne fonction verifyToken
 */
export async function verifyToken(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return {
      authenticated: false,
      message: "Non authentifié"
    };
  }
  
  return {
    authenticated: true,
    user: session.user
  };
}

/**
 * Middleware pour vérifier l'authentification
 * Utilise NextAuth au lieu de l'ancien système basé sur JWT
 */
export function withAuth(handler) {
  return async (req, res) => {
    const authResult = await verifyToken(req, res);
    
    if (!authResult.authenticated) {
      return res.status(401).json({ error: "Non autorisé" });
    }
    
    // Ajouter les informations d'utilisateur à la requête
    req.user = authResult.user;
    
    // Continuer avec le gestionnaire de la route
    return handler(req, res);
  };
}
