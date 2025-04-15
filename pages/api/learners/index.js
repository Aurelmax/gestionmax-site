import { getAllLearners } from '../../../lib/learners';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    // En mode développement, ignorer la vérification d'authentification
    if (process.env.NODE_ENV === 'development') {
      // Récupérer tous les apprenants
      const learners = await getAllLearners();
      
      // Répondre avec la liste des apprenants
      return res.status(200).json({ success: true, learners });
    }
    
    // En production, vérifier l'authentification
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }

    // Récupérer tous les apprenants
    const learners = await getAllLearners();
    
    // Répondre avec la liste des apprenants
    return res.status(200).json({ success: true, learners });
  } catch (error) {
    console.error('Erreur lors de la récupération des apprenants:', error);
    return res.status(500).json({ success: false, message: error.message || 'Erreur lors de la récupération des apprenants' });
  }
}
