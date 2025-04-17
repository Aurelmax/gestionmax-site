import { generateResetToken } from '../../../lib/password-reset';
import { sendPasswordResetEmail } from '../../../lib/email';

export default async function handler(req, res) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    const { email } = req.body;
    
    // Vérifier si l'email est fourni
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email requis' });
    }
    
    // Vérifier si l'email correspond à l'administrateur
    const adminEmail = process.env.ADMIN_EMAIL;
    
    console.log('Email de demande:', email);
    console.log('Email admin configuré:', adminEmail);
    
    if (email !== adminEmail) {
      // Pour des raisons de sécurité, ne pas révéler si l'email existe ou non
      return res.status(200).json({ 
        success: true, 
        message: 'Si cette adresse email est associée à un compte, un email de réinitialisation a été envoyé.' 
      });
    }
    
    // Générer un token de réinitialisation
    const token = generateResetToken();
    
    // Construire l'URL de réinitialisation
    const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${token}`;
    
    console.log('URL de réinitialisation générée:', resetUrl);
    
    // Envoyer l'email
    try {
      await sendPasswordResetEmail(email, resetUrl);
      console.log('Email de réinitialisation envoyé avec succès');
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de l\'envoi de l\'email de réinitialisation' 
      });
    }
    
    // Répondre avec succès
    return res.status(200).json({ 
      success: true, 
      message: 'Email de réinitialisation envoyé avec succès' 
    });
    
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur lors du traitement de la demande' 
    });
  }
}