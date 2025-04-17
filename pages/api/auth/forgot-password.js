// pages/api/auth/forgot-password.js

export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Méthode non autorisée' });
    }
  
    // Traitement fictif de la demande (à adapter à ton système)
    return res.status(200).json({ message: 'Email de réinitialisation envoyé (exemple)' });
  }
  
  