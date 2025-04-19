import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { hash } from 'bcryptjs';
import { sendPasswordResetEmail } from './email';

// Stockage temporaire des tokens (en production, utilisez une base de données)
let resetTokens = {};

// Générer un token de réinitialisation
export async function generateResetToken(email) {
  // Vérifier que l'email correspond à l'administrateur
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gestionmax.fr';
  
  if (email !== adminEmail) {
    throw new Error('Email non reconnu');
  }
  
  // Générer un token aléatoire
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // Stocker le token avec une expiration (1 heure)
  resetTokens[email] = {
    token: hashedToken,
    expires: Date.now() + 3600000, // 1 heure
  };
  
  // Envoyer l'email de réinitialisation
  const emailSent = await sendPasswordResetEmail(email, resetToken);
  
  if (!emailSent) {
    throw new Error('Échec de l\'envoi de l\'email');
  }
  
  return true;
}

// Vérifier un token de réinitialisation
export function verifyResetToken(email, token) {
  // Vérifier que le token existe pour cet email
  if (!resetTokens[email] || !resetTokens[email].token) {
    return false;
  }
  
  // Vérifier que le token n'est pas expiré
  if (resetTokens[email].expires < Date.now()) {
    // Supprimer le token expiré
    delete resetTokens[email];
    return false;
  }
  
  // Vérifier que le token correspond
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return resetTokens[email].token === hashedToken;
}

// Réinitialiser le mot de passe
export async function resetPassword(email, token, newPassword) {
  // Vérifier le token
  if (!verifyResetToken(email, token)) {
    throw new Error('Token invalide ou expiré');
  }
  
  try {
    // Hasher le nouveau mot de passe
    const passwordHash = await hash(newPassword, 12);
    
    // En production, vous devriez mettre à jour le mot de passe dans une base de données
    // Pour cette implémentation, nous allons simuler une mise à jour du fichier .env.local
    
    console.log('Nouveau hash de mot de passe généré:', passwordHash);
    
    // Supprimer le token utilisé
    delete resetTokens[email];
    
    return {
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
      passwordHash
    };
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    throw new Error('Échec de la réinitialisation du mot de passe');
  }
}