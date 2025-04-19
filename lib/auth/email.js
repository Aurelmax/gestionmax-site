import nodemailer from 'nodemailer';

// Configuration du transporteur d'email
// En production, utilisez un service SMTP réel
export const createTransporter = () => {
  // Pour le développement, utilisez un service de test comme Ethereal
  if (process.env.NODE_ENV !== 'production') {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'test@example.com',
        pass: process.env.EMAIL_PASSWORD || 'password',
      },
    });
  }

  // Pour la production, utilisez votre service SMTP réel
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Fonction pour envoyer un email de réinitialisation de mot de passe
export async function sendPasswordResetEmail(email, resetToken) {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.NEXTAUTH_URL}/admin/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@gestionmax.fr',
    to: email,
    subject: 'Réinitialisation de votre mot de passe GestionMax',
    text: `Bonjour,\n\nVous avez demandé une réinitialisation de votre mot de passe. Veuillez cliquer sur le lien suivant pour définir un nouveau mot de passe :\n\n${resetUrl}\n\nCe lien est valable pendant 1 heure.\n\nSi vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.\n\nCordialement,\nL'équipe GestionMax`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Réinitialisation de votre mot de passe</h2>
        <p>Bonjour,</p>
        <p>Vous avez demandé une réinitialisation de votre mot de passe. Veuillez cliquer sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Réinitialiser mon mot de passe</a>
        </div>
        <p>Ce lien est valable pendant 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
        <p>Cordialement,<br>L'équipe GestionMax</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}