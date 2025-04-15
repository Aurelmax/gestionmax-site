import { getLearnerDocuments, getLearnerById } from '../../../../lib/learners';
import { verifyToken } from '../../../../lib/auth';

export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    // Vérifier l'authentification
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }

    // Récupérer l'ID de l'apprenant depuis l'URL
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID d\'apprenant non spécifié' });
    }
    
    // Vérifier si l'apprenant existe
    const learner = await getLearnerById(id);
    if (!learner) {
      return res.status(404).json({ success: false, message: 'Apprenant non trouvé' });
    }
    
    // Récupérer les documents de l'apprenant
    const documents = await getLearnerDocuments(id);
    
    // Répondre avec la liste des documents
    return res.status(200).json({ success: true, documents, learner });
  } catch (error) {
    console.error('Erreur lors de la récupération des documents:', error);
    return res.status(500).json({ success: false, message: error.message || 'Erreur lors de la récupération des documents' });
  }
}
