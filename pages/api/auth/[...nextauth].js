import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import pool from "../../../lib/db"; // <-- utilise le pool

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Nom d'utilisateur", type: "text" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        const client = await pool.connect();

        try {
          const res = await client.query(
            "SELECT * FROM users WHERE username = $1",
            [credentials.username]
          );

          const user = res.rows[0];

          if (!user) {
            throw new Error("Utilisateur non trouvé");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isValid) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user.id,
            name: user.username,
            role: user.role
          };
        } catch (err) {
          console.error("Erreur d'auth:", err);
          return null;
        } finally {
          client.release(); // <-- libère proprement
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export default handler;
