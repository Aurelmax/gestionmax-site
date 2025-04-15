import { deleteImage } from '../../../lib/media/mediaUtils';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    // Vérifier l'authentification
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }

    // Récupérer le nom du fichier à supprimer
    const { filename } = req.query;
    
    if (!filename) {
      return res.status(400).json({ success: false, message: 'Nom de fichier non spécifié' });
    }
    
    // Déterminer si nous sommes en mode développement
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // En mode développement, simuler la suppression
    if (isDevelopment) {
      return res.status(200).json({ success: true, message: 'Image supprimée avec succès (simulation)' });
    }
    
    // En production, supprimer réellement l'image
    const result = await deleteImage(filename);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    return res.status(500).json({ success: false, message: error.message || 'Erreur lors de la suppression de l\'image' });
  }
}
