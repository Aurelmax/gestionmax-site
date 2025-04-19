// lib/media/mediaUtils.js
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Sauvegarde une image sur le disque
export async function saveImageFile(buffer, originalFilename) {
  // Créer le répertoire de médias s'il n'existe pas
  const mediaDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  // Générer un nom de fichier unique
  const fileExtension = path.extname(originalFilename);
  const fileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(mediaDir, fileName);

  // Écrire le fichier
  fs.writeFileSync(filePath, buffer);

  // Retourner le chemin relatif pour l'accès via URL
  return `/uploads/${fileName}`;
}

// Supprimer un fichier média
export async function deleteMediaFile(filePath) {
  if (!filePath) return false;
  
  // Extraire le nom du fichier de l'URL
  const fileName = path.basename(filePath);
  const fullPath = path.join(process.cwd(), 'public', 'uploads', fileName);
  
  // Vérifier si le fichier existe
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    return true;
  }
  
  return false;
}

// Lister tous les fichiers médias
export async function listMediaFiles() {
  const mediaDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Créer le répertoire s'il n'existe pas
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
    return [];
  }
  
  // Lire les fichiers dans le répertoire
  const files = fs.readdirSync(mediaDir);
  
  // Retourner les informations sur chaque fichier
  return files.map(file => {
    const filePath = path.join(mediaDir, file);
    const stats = fs.statSync(filePath);
    
    return {
      name: file,
      path: `/uploads/${file}`,
      size: stats.size,
      createdAt: stats.birthtime
    };
  });
}

// Alias pour la compatibilité avec le code existant
export const deleteImage = deleteMediaFile;
export const getImagesList = listMediaFiles;

// Fonction pour les images de démonstration
export function getMockImages() {
  return [
    {
      name: 'demo-image-1.jpg',
      path: '/uploads/demo-image-1.jpg',
      size: 12345,
      createdAt: new Date()
    },
    {
      name: 'demo-image-2.jpg',
      path: '/uploads/demo-image-2.jpg',
      size: 23456,
      createdAt: new Date()
    }
  ];
}