import multer from 'multer';
import { saveImageFile } from '../../../lib/media/mediaUtils';
import { verifyToken } from '../../../lib/auth';

// Configuration de multer pour le stockage en mémoire
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite à 5MB
  },
  fileFilter: (req, file, cb) => {
    // Vérifier le type de fichier
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées!'), false);
    }
  }
});

// Middleware pour gérer le téléchargement d'un seul fichier
const uploadMiddleware = upload.single('image');

// Fonction pour traiter la requête multer
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    // Vérifier l'authentification
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Non autorisé' });
    }

    // Traiter le téléchargement
    await runMiddleware(req, res, uploadMiddleware);

    // Vérifier si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier téléchargé' });
    }

    // Sauvegarder le fichier
    const savedFile = await saveImageFile(req.file);

    // Répondre avec les informations du fichier
    return res.status(200).json({ success: true, file: savedFile });
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    return res.status(500).json({ success: false, message: error.message || 'Erreur lors du téléchargement' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Désactiver le body parser intégré car multer le fait pour nous
  },
};
