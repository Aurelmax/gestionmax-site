const bcrypt = require('bcryptjs');

// Génère un sel avec le préfixe $2a$
const salt = '$2a$12$' + require('crypto')
  .randomBytes(16)
  .toString('base64')
  .slice(0, 22)
  .replace(/\+/g, '.')
  .replace(/\//g, '.');

const password = 'JaimeLeweb';

bcrypt.hash(password, salt).then((hash) => {
  console.log('Hash $2a$ généré :', hash);
});