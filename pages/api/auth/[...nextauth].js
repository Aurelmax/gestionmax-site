// Affiche l'environnement d'exécution (développement ou production)
console.log("ENV ACTUEL :", process.env.NODE_ENV);

// Import des modules nécessaires pour l'authentification
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Import de la fonction de vérification des identifiants
import { verifyCredentials } from '../../../lib/auth/verifyCredentials';


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        // Utiliser directement verifyCredentials pour harmoniser la logique
        if (!credentials) return null;

        try {
          const user = await verifyCredentials(credentials);
          return user;
        } catch (error) {
          console.error("Erreur d'authentification :", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'votre-secret-temporaire-a-changer-en-production',
})