import multer from 'multer';
import { saveDocument, getLearnerById } from '../../../../lib/learners';
import { verifyToken } from '../../../../lib/auth';

// Configuration de multer pour le stockage en mémoire
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite à 10MB
  },
  fileFilter: (req, file, cb) => {
    // Vérifier le type de fichier (PDF, DOC, DOCX, etc.)
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé. Seuls les PDF et documents Word sont acceptés.'), false);
    }
  }
});

// Middleware pour gérer le téléchargement d'un seul fichier
const uploadMiddleware = upload.single('document');

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
    
    // Traiter le téléchargement
    await runMiddleware(req, res, uploadMiddleware);

    // Vérifier si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier téléchargé' });
    }

    // Récupérer le type de document
    const { type } = req.body;
    if (!type) {
      return res.status(400).json({ success: false, message: 'Type de document non spécifié' });
    }

    // Sauvegarder le document
    const savedDocument = await saveDocument(req.file, type, id);

    // Répondre avec les informations du document
    return res.status(200).json({ success: true, document: savedDocument });
  } catch (error) {
    console.error('Erreur lors du téléchargement du document:', error);
    return res.status(500).json({ success: false, message: error.message || 'Erreur lors du téléchargement du document' });
  }
}

export const config = {
  api: {
    bodyParser: false, // Désactiver le body parser intégré car multer le fait pour nous
  },
};
