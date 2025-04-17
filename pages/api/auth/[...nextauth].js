console.log("ENV ACTUEL :", process.env.NODE_ENV);
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyCredentials } from '../../../lib/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        const isTest = process.env.NODE_ENV !== 'production';

        if (isTest) {
          // En test (ou développement), retourner un utilisateur fictif
          return {
            id: 1,
            name: 'Administrateur',
            email: 'admin@gestionmax.fr',
            role: 'admin',
          };
        }

        // En production, vérifier les identifiants
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