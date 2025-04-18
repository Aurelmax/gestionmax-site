const bcrypt = require('bcryptjs');

const password = 'nouveaumotdepasse2025!';
const hash = '$2a$12$RT3admTw.QAoPJROngOgHOaZSZUUvFIqRvgOVP0hGGWgUYl/K.krm';

bcrypt.compare(password, hash).then(result => {
  console.log('Le mot de passe correspond :', result);
});
