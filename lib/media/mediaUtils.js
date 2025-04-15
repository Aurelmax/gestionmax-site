import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Chemin de base pour les uploads
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const IMAGES_DIR = path.join(UPLOAD_DIR, 'images');

// Assurez-vous que les répertoires existent
function ensureDirectoriesExist() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
}

// Générer un nom de fichier unique
function generateUniqueFilename(originalFilename) {
  const ext = path.extname(originalFilename);
  const uuid = uuidv4();
  return `${uuid}${ext}`;
}

// Sauvegarder un fichier image
export async function saveImageFile(file) {
  ensureDirectoriesExist();
  
  // Générer un nom de fichier unique
  const uniqueFilename = generateUniqueFilename(file.originalname);
  const filePath = path.join(IMAGES_DIR, uniqueFilename);
  
  // Écrire le fichier
  await fs.promises.writeFile(filePath, file.buffer);
  
  // Retourner les informations sur le fichier sauvegardé
  return {
    filename: uniqueFilename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: `/uploads/images/${uniqueFilename}`,
    url: `/uploads/images/${uniqueFilename}`
  };
}

// Récupérer la liste des images
export async function getImagesList() {
  ensureDirectoriesExist();
  
  try {
    const files = await fs.promises.readdir(IMAGES_DIR);
    
    // Récupérer les informations pour chaque fichier
    const fileInfoPromises = files.map(async (filename) => {
      const filePath = path.join(IMAGES_DIR, filename);
      const stats = await fs.promises.stat(filePath);
      
      return {
        filename,
        path: `/uploads/images/${filename}`,
        url: `/uploads/images/${filename}`,
        size: stats.size,
        createdAt: stats.birthtime,
        updatedAt: stats.mtime
      };
    });
    
    return Promise.all(fileInfoPromises);
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    return [];
  }
}

// Supprimer une image
export async function deleteImage(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  
  try {
    // Vérifier si le fichier existe
    await fs.promises.access(filePath);
    
    // Supprimer le fichier
    await fs.promises.unlink(filePath);
    
    return { success: true, message: 'Image supprimée avec succès' };
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    return { success: false, message: 'Erreur lors de la suppression de l\'image' };
  }
}

// Obtenir les informations d'une image
export async function getImageInfo(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  
  try {
    // Vérifier si le fichier existe
    await fs.promises.access(filePath);
    
    // Obtenir les informations du fichier
    const stats = await fs.promises.stat(filePath);
    
    return {
      filename,
      path: `/uploads/images/${filename}`,
      url: `/uploads/images/${filename}`,
      size: stats.size,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de l\'image:', error);
    return null;
  }
}

// Fonction pour simuler des données d'images en mode développement
export function getMockImages(count = 10) {
  const mockImages = [];
  
  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    mockImages.push({
      id,
      filename: `mock-image-${i + 1}.jpg`,
      originalname: `image-${i + 1}.jpg`,
      path: `/uploads/images/mock-image-${i + 1}.jpg`,
      url: `https://picsum.photos/seed/${id}/800/600`,
      size: Math.floor(Math.random() * 1000000) + 100000,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000))
    });
  }
  
  return mockImages;
}
