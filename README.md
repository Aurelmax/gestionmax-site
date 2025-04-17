# Gestionmax - Site Vitrine

Site vitrine professionnel pour Gestionmax, consultant formateur WordPress basé à Antibes, spécialisé dans l'autonomie digitale des indépendants, artisans et petites entreprises.

## Technologies utilisées

- Next.js - Framework React pour le développement web
- Tailwind CSS - Framework CSS utilitaire
- Heroicons - Bibliothèque d'icônes SVG
- NextAuth.js - Authentification et gestion des sessions
- Nodemailer - Envoi d'emails pour la récupération de mot de passe
- bcryptjs - Hachage sécurisé des mots de passe

## Structure du projet

- `/pages` - Pages du site (accueil, à propos, blog, contact, mentions légales)
  - `/pages/admin` - Pages d'administration (login, forgot-password, reset-password)
  - `/pages/api` - API Routes pour l'authentification et les fonctionnalités backend
- `/components` - Composants réutilisables (navbar, footer, layout)
- `/public` - Ressources statiques (images, favicon)
- `/styles` - Styles CSS globaux et configuration Tailwind
- `/lib` - Bibliothèques et utilitaires (auth, email, password-reset)

## Fonctionnalités

- Design responsive adapté à tous les appareils
- Optimisation SEO pour le référencement local
- Formulaire de contact
- Espace ressources pour téléchargement de documents
- Blog/Actualités avec système de catégories
- Intégration de newsletter
- Système d'authentification administrateur
- Récupération de mot de passe par email

## Système d'authentification

Le site utilise NextAuth.js pour gérer l'authentification administrateur avec les fonctionnalités suivantes :

### Connexion administrateur
- Authentification par identifiants (nom d'utilisateur/mot de passe)
- Sessions JWT sécurisées avec une durée de 30 jours
- Mode développement avec authentification automatique pour faciliter les tests

### Récupération de mot de passe
Le système de récupération de mot de passe permet à l'administrateur de réinitialiser son mot de passe en cas d'oubli :

1. L'administrateur demande une réinitialisation via la page `/admin/forgot-password`
2. Un email contenant un lien de réinitialisation temporaire est envoyé à l'adresse configurée
3. Le lien dirige vers la page `/admin/reset-password` avec un token sécurisé
4. L'administrateur définit un nouveau mot de passe
5. Le système génère un nouveau hash de mot de passe à mettre à jour dans le fichier `.env.local`

## Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
# Environnement
NODE_ENV=development  # ou production

# NextAuth
NEXTAUTH_URL=http://localhost:3000  # URL de votre site
NEXTAUTH_SECRET=votre-secret-jwt    # Secret pour les tokens JWT

# Authentification
ADMIN_USERNAME=admin                # Nom d'utilisateur administrateur
ADMIN_PASSWORD_HASH=hash-bcrypt     # Hash bcrypt du mot de passe
ADMIN_EMAIL=admin@example.com       # Email de l'administrateur

# Configuration email (pour la récupération de mot de passe)
EMAIL_HOST=smtp.votre-service.com   # Serveur SMTP
EMAIL_PORT=587                      # Port SMTP
EMAIL_SECURE=false                  # true pour SSL/TLS
EMAIL_USER=votre-email@domaine.com  # Utilisateur SMTP
EMAIL_PASSWORD=votre-mot-de-passe   # Mot de passe SMTP
EMAIL_FROM=noreply@gestionmax.fr    # Adresse d'expédition
```

## Installation

1. Cloner le dépôt
```bash
git clone <url-du-depot>
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement (voir section Configuration)

4. Lancer le serveur de développement
```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Déploiement

Pour construire le site pour la production :

```bash
npm run build
```

Pour démarrer le site en production :

```bash
npm run start
```

## Contact

Pour toute question concernant ce projet, veuillez contacter :
- Email: contact@gestionmax.fr
