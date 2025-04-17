export default function handler(req, res) {
    res.status(200).json({
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      ADMIN_USERNAME: process.env.ADMIN_USERNAME,
      ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? '✅ Définie' : '❌ Non définie'
    });
  }
  