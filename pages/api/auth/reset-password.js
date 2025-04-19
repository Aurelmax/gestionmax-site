import { verifyResetToken } from '../../../lib/auth/password-reset';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ success: false, message: 'Token et mot de passe requis' });
    }

    const isValid = verifyResetToken(token);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Token invalide ou expiré' });
    }

    const passwordHash = await hash(password, 12);

    return res.status(200).json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
      passwordHash
    });

  } catch (error) {
    console.error('Erreur reset-password:', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
