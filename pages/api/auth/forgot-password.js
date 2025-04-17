export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }
  
    // Logique de traitement du forgot password (ex: envoi d'email avec token)
    return res.status(200).json({ success: true, message: 'Email envoyé (simulation)' });
  }
  