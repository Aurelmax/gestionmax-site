import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Types de documents
export const DOCUMENT_TYPES = {
  DEVIS: 'devis',
  CONVENTION: 'conventions',
  FACTURE: 'factures',
  EMARGEMENT: 'emargements',
  CERTIFICAT: 'certificats',
  BILAN: 'bilans'
};

// Générer un nom de fichier unique
export function generateUniqueFilename(originalFilename) {
  const ext = path.extname(originalFilename);
  const uuid = uuidv4();
  return `${uuid}${ext}`;
}

// Données fictives pour les apprenants
export function getMockLearners() {
  return [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      company: 'Entreprise A',
      phone: '0123456789',
      formation: 'WordPress Avancé',
      formationId: '1',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      company: 'Entreprise B',
      phone: '0987654321',
      formation: 'SEO pour WordPress',
      formationId: '2',
      startDate: '2025-04-01',
      endDate: '2025-04-10',
      status: 'in_progress'
    },
    {
      id: '3',
      name: 'Pierre Durand',
      email: 'pierre.durand@example.com',
      company: 'Entreprise C',
      phone: '0654321987',
      formation: 'E-commerce avec WooCommerce',
      formationId: '3',
      startDate: '2025-05-01',
      endDate: '2025-05-20',
      status: 'upcoming'
    }
  ];
}

// Données fictives pour les documents d'un apprenant
export function getMockLearnerDocuments(learnerId) {
  return [
    {
      id: 'doc1',
      filename: 'doc1.pdf',
      originalname: 'Devis-Formation-WordPress.pdf',
      mimetype: 'application/pdf',
      size: 1024 * 1024 * 2.5, // 2.5 MB
      type: DOCUMENT_TYPES.DEVIS,
      learnerId,
      path: `/documents/${DOCUMENT_TYPES.DEVIS}/doc1.pdf`,
      url: `/documents/${DOCUMENT_TYPES.DEVIS}/doc1.pdf`,
      createdAt: '2025-02-15T10:30:00Z'
    },
    {
      id: 'doc2',
      filename: 'doc2.pdf',
      originalname: 'Convention-Formation.pdf',
      mimetype: 'application/pdf',
      size: 1024 * 1024 * 1.8, // 1.8 MB
      type: DOCUMENT_TYPES.CONVENTION,
      learnerId,
      path: `/documents/${DOCUMENT_TYPES.CONVENTION}/doc2.pdf`,
      url: `/documents/${DOCUMENT_TYPES.CONVENTION}/doc2.pdf`,
      createdAt: '2025-02-20T14:15:00Z'
    },
    {
      id: 'doc3',
      filename: 'doc3.pdf',
      originalname: 'Facture-Formation.pdf',
      mimetype: 'application/pdf',
      size: 1024 * 1024 * 0.9, // 0.9 MB
      type: DOCUMENT_TYPES.FACTURE,
      learnerId,
      path: `/documents/${DOCUMENT_TYPES.FACTURE}/doc3.pdf`,
      url: `/documents/${DOCUMENT_TYPES.FACTURE}/doc3.pdf`,
      createdAt: '2025-03-05T09:45:00Z'
    }
  ];
}

// Récupérer tous les apprenants
export async function getAllLearners() {
  return getMockLearners();
}

// Récupérer un apprenant par son ID
export async function getLearnerById(id) {
  const learners = getMockLearners();
  return learners.find(learner => learner.id === id) || null;
}

// Récupérer les documents d'un apprenant
export async function getLearnerDocuments(learnerId) {
  return getMockLearnerDocuments(learnerId);
}

// Note: Les fonctions ci-dessous ne sont utilisées que dans les API routes (côté serveur)
// et ne seront pas incluses dans le bundle client

// Ces fonctions sont exportées uniquement pour être utilisées côté serveur
// dans les API routes
export const serverOnlyFunctions = {
  // Assurez-vous que les répertoires existent (côté serveur uniquement)
  ensureDirectoriesExist: () => {
    // Cette fonction ne sera appelée que dans les API routes
    if (typeof window === 'undefined') {
      const fs = require('fs');
      const DOCUMENTS_DIR = path.join(process.cwd(), 'public', 'documents');
      
      Object.values(DOCUMENT_TYPES).forEach(type => {
        const typePath = path.join(DOCUMENTS_DIR, type);
        if (!fs.existsSync(typePath)) {
          fs.mkdirSync(typePath, { recursive: true });
        }
      });
    }
  },
  
  // Sauvegarder un document (côté serveur uniquement)
  saveDocument: async (file, type, learnerId) => {
    if (typeof window === 'undefined') {
      const fs = require('fs');
      const DOCUMENTS_DIR = path.join(process.cwd(), 'public', 'documents');
      
      if (!Object.values(DOCUMENT_TYPES).includes(type)) {
        throw new Error(`Type de document non valide: ${type}`);
      }
      
      // Appeler la fonction ensureDirectoriesExist
      serverOnlyFunctions.ensureDirectoriesExist();
      
      // Générer un nom de fichier unique
      const uniqueFilename = generateUniqueFilename(file.originalname);
      const typePath = path.join(DOCUMENTS_DIR, type);
      const filePath = path.join(typePath, uniqueFilename);
      
      // Écrire le fichier
      await fs.promises.writeFile(filePath, file.buffer);
      
      // Retourner les informations sur le fichier sauvegardé
      return {
        id: uniqueFilename.split('.')[0],
        filename: uniqueFilename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        type,
        learnerId,
        path: `/documents/${type}/${uniqueFilename}`,
        url: `/documents/${type}/${uniqueFilename}`,
        createdAt: new Date().toISOString()
      };
    }
    
    // En cas d'appel côté client (ne devrait pas arriver)
    throw new Error('Cette fonction ne peut être appelée que côté serveur');
  }
};
