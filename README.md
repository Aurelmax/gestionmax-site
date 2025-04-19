# Gestionmax - Site Vitrine

Site vitrine professionnel pour Gestionmax, consultant formateur WordPress basé à Antibes, spécialisé dans l'autonomie digitale des indépendants, artisans et petites entreprises.

## Technologies utilisées

- Next.js - Framework React pour le développement web
- Tailwind CSS - Framework CSS utilitaire
- Heroicons - Bibliothèque d'icônes SVG
- NextAuth.js - Authentification et gestion des sessions
- Nodemailer - Envoi d'emails pour la récupération de mot de passe
- bcryptjs - Hachage sécurisé des mots de passe
- PostgreSQL - Base de données pour l'authentification et la gestion des données

## Structure du projet

- `/pages` - Pages du site (accueil, à propos, blog, contact, mentions légales)
  - `/pages/admin` - Pages d'administration (login, forgot-password, reset-password, gestion des apprenants)
  - `/pages/api` - API Routes pour l'authentification et les fonctionnalités backend
- `/components` - Composants réutilisables (navbar, footer, layout)
- `/public` - Ressources statiques (images, favicon, uploads)
- `/styles` - Styles CSS globaux et configuration Tailwind
- `/lib` - Bibliothèques et utilitaires (auth, email, password-reset, media)

## Fonctionnalités

- Design responsive adapté à tous les appareils
- Optimisation SEO pour le référencement local
- Formulaire de contact
- Espace ressources pour téléchargement de documents
- Blog/Actualités avec système de catégories
- Intégration de newsletter
- Système d'authentification administrateur avec base de données PostgreSQL
- Récupération de mot de passe par email
- Gestion des médias avec upload d'images
- Interface d'administration pour les apprenants

## Système d'authentification

Le site utilise NextAuth.js avec une base de données PostgreSQL pour gérer l'authentification administrateur avec les fonctionnalités suivantes :

### Connexion administrateur
- Authentification par identifiants (nom d'utilisateur/mot de passe) stockés en base de données PostgreSQL
- Hachage sécurisé des mots de passe avec bcrypt
- Sessions JWT sécurisées avec une durée configurable
- Support multi-utilisateurs avec différents rôles

### Base de données PostgreSQL
La base de données PostgreSQL contient une table `users` avec les colonnes suivantes :
- `id` : Identifiant unique de l'utilisateur
- `username` : Nom d'utilisateur
- `password_hash` : Hash du mot de passe (généré avec bcrypt)
- `role` : Rôle de l'utilisateur (admin, etc.)
- `created_at` : Date de création du compte
- `updated_at` : Date de dernière mise à jour

### Variables d'environnement
Les variables d'environnement nécessaires sont :
- `NEXTAUTH_URL` : URL de base du site (ex: http://localhost:3000 en développement)
- `NEXTAUTH_SECRET` : Clé secrète pour signer les jetons JWT
- `DATABASE_URL` : URL de connexion à la base de données PostgreSQL

### Gestion des médias
Le site inclut un système de gestion des médias avec les fonctionnalités suivantes :
- Upload d'images avec vérification du type de fichier
- Stockage sécurisé des fichiers dans le répertoire `/public/uploads`
- Génération de noms de fichiers uniques pour éviter les conflits
- API pour lister, télécharger et supprimer les fichiers médias

### Gestion des apprenants
Une interface d'administration permet de gérer les apprenants avec les fonctionnalités suivantes :
- Liste des apprenants avec pagination
- Ajout, modification et suppression d'apprenants
- Stockage des informations dans la base de données PostgreSQL

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

# Base de données PostgreSQL
DATABASE_URL=postgres://user:password@host:port/dbname
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

### Environnement de développement
1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Créer un fichier `.env.local` avec les variables d'environnement nécessaires
4. Lancer le serveur de développement : `npm run dev`

### Déploiement sur Scalingo
1. Configurer les variables d'environnement sur Scalingo :
   - `NEXTAUTH_URL` : URL de production (https://www.gestionmax.fr)
   - `NEXTAUTH_SECRET` : Clé secrète pour la production
   - `DATABASE_URL` : `$SCALINGO_POSTGRESQL_URL`
   - `NODE_ENV` : `production`
2. Déployer l'application : `git push scalingo main`

## Mise à jour (Avril 2025)
- Migration de l'authentification depuis les variables d'environnement vers PostgreSQL
- Ajout de la gestion des médias avec upload d'images
- Création d'une interface d'administration pour les apprenants
- Amélioration de la sécurité avec bcrypt et NextAuth.js

## Contact

Pour toute question concernant ce projet, veuillez contacter :
- Email: contact@gestionmax.fr
