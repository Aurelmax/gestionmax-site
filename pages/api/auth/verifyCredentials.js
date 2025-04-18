import bcrypt from 'bcryptjs';

export async function verifyCredentials({ username, password }) {
  const validUsername = process.env.ADMIN_USERNAME;
  const hashedPassword = process.env.ADMIN_PASSWORD_HASH;

  if (!validUsername || !hashedPassword) {
    console.error("Identifiants d'admin manquants dans les variables d'environnement.");
    throw new Error("Configuration incomplète");
  }

  if (username !== validUsername) {
    console.warn("Nom d'utilisateur incorrect");
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    console.warn("Mot de passe incorrect");
    return null;
  }

  return {
    id: 1,
    name: "Admin",
    role: "admin"
  };
}
