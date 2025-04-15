import { getImagesList, getMockImages } from '../../../lib/media/mediaUtils';
import { verifyToken } from '../../../lib/auth';

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

    // Déterminer si nous sommes en mode développement
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // En mode développement, utiliser des données fictives
    if (isDevelopment) {
      const mockImages = getMockImages(15); // Générer 15 images fictives
      return res.status(200).json({ success: true, images: mockImages });
    }
    
    // En production, récupérer la liste réelle des images
    const images = await getImagesList();
    
    // Répondre avec la liste des images
    return res.status(200).json({ success: true, images });
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    return res.status(500).json({ success: false, message: error.message || 'Erreur lors de la récupération des images' });
  }
}
