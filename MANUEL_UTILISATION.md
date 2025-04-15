# Manuel d'utilisation - Site Gestionmax

## Table des matières

1. [Introduction](#introduction)
2. [Accès à l'administration](#accès-à-ladministration)
3. [Tableau de bord](#tableau-de-bord)
4. [Gestion des formations](#gestion-des-formations)
5. [Gestion du blog](#gestion-du-blog)
6. [Gestion des témoignages](#gestion-des-témoignages)
7. [Gestion des projets](#gestion-des-projets)
8. [Bibliothèque de médias](#bibliothèque-de-médias)
9. [Espace apprenant](#espace-apprenant)
10. [Paramètres](#paramètres)

## Introduction

Bienvenue dans le manuel d'utilisation du site Gestionmax, votre plateforme professionnelle dédiée à la formation WordPress pour les indépendants et petites entreprises. Ce manuel vous guidera à travers toutes les fonctionnalités du site et vous montrera comment gérer efficacement votre contenu.

Le site Gestionmax a été développé avec les technologies suivantes :
- **Framework** : Next.js 14
- **Styling** : Tailwind CSS
- **Authentification** : NextAuth.js
- **Gestion de contenu** : Système basé sur Markdown

## Accès à l'administration

Pour accéder à l'interface d'administration, suivez ces étapes :

1. Rendez-vous sur `https://www.gestionmax.fr/admin/login` (ou `http://localhost:3000/admin/login` en développement)
2. Saisissez vos identifiants :
   - **Email** : votre email administrateur
   - **Mot de passe** : votre mot de passe

> **Note pour le développement** : En mode développement, vous pouvez utiliser les identifiants suivants :
> - **Email** : admin@gestionmax.fr
> - **Mot de passe** : admin

Une fois connecté, vous serez redirigé vers le tableau de bord d'administration.

## Tableau de bord

Le tableau de bord vous donne une vue d'ensemble de votre site :

- **Statistiques** : Nombre de formations, articles de blog, témoignages et projets
- **Activité récente** : Dernières modifications apportées au site
- **Accès rapides** : Liens vers les sections principales

## Gestion des formations

### Liste des formations

La page de liste des formations vous permet de voir toutes vos formations en un coup d'œil :

1. Accédez à **Formations** dans le menu latéral
2. Utilisez la barre de recherche pour trouver une formation spécifique
3. Filtrez les formations par catégorie ou niveau
4. Cliquez sur **Nouvelle formation** pour créer une formation

### Création d'une formation

Pour créer une nouvelle formation :

1. Cliquez sur **Nouvelle formation**
2. Remplissez les champs du formulaire :
   - **Titre** : Nom de la formation
   - **Description** : Résumé court de la formation
   - **Slug** : Identifiant URL (généré automatiquement, mais modifiable)
   - **Catégorie** : Type de formation
   - **Durée** : Durée de la formation
   - **Niveau** : Débutant, Intermédiaire ou Avancé
   - **Prix** : Tarif de la formation
   - **Image de couverture** : Sélectionnez une image depuis la bibliothèque de médias
   - **Contenu** : Description détaillée de la formation (format Markdown)
3. Cochez **Formation mise en avant** si vous souhaitez la mettre en avant sur la page d'accueil
4. Cliquez sur **Enregistrer**

### Modification d'une formation

Pour modifier une formation existante :

1. Trouvez la formation dans la liste
2. Cliquez sur l'icône de crayon (Modifier)
3. Modifiez les champs nécessaires
4. Cliquez sur **Enregistrer**

### Prévisualisation et suppression

- Pour prévisualiser une formation, cliquez sur l'icône d'œil
- Pour supprimer une formation, cliquez sur l'icône de corbeille et confirmez la suppression

## Gestion du blog

### Liste des articles

La page de liste des articles vous permet de gérer votre blog :

1. Accédez à **Blog** dans le menu latéral
2. Utilisez la barre de recherche pour trouver un article spécifique
3. Filtrez les articles par catégorie ou statut
4. Cliquez sur **Nouvel article** pour créer un article

### Création d'un article

Pour créer un nouvel article :

1. Cliquez sur **Nouvel article**
2. Remplissez les champs du formulaire :
   - **Titre** : Titre de l'article
   - **Description** : Résumé court de l'article
   - **Slug** : Identifiant URL (généré automatiquement, mais modifiable)
   - **Auteur** : Nom de l'auteur
   - **Date** : Date de publication
   - **Catégorie** : Catégorie de l'article
   - **Tags** : Mots-clés séparés par des virgules
   - **Image de couverture** : Sélectionnez une image depuis la bibliothèque de médias
   - **Contenu** : Corps de l'article (format Markdown)
3. Cochez **Publié** si vous souhaitez que l'article soit visible
4. Cliquez sur **Enregistrer**

### Modification d'un article

Pour modifier un article existant :

1. Trouvez l'article dans la liste
2. Cliquez sur l'icône de crayon (Modifier)
3. Modifiez les champs nécessaires
4. Cliquez sur **Enregistrer**

## Gestion des témoignages

### Liste des témoignages

La page de liste des témoignages vous permet de gérer les avis clients :

1. Accédez à **Témoignages** dans le menu latéral
2. Utilisez la barre de recherche pour trouver un témoignage spécifique
3. Cliquez sur **Nouveau témoignage** pour ajouter un témoignage

### Création d'un témoignage

Pour créer un nouveau témoignage :

1. Cliquez sur **Nouveau témoignage**
2. Remplissez les champs du formulaire :
   - **Nom** : Nom du client
   - **Entreprise** : Nom de l'entreprise du client
   - **Poste** : Fonction du client
   - **Note** : Évaluation sur 5 étoiles
   - **Témoignage** : Contenu du témoignage
3. Cliquez sur **Enregistrer**

### Modification d'un témoignage

Pour modifier un témoignage existant :

1. Trouvez le témoignage dans la liste
2. Cliquez sur l'icône de crayon (Modifier)
3. Modifiez les champs nécessaires
4. Cliquez sur **Enregistrer**

## Gestion des projets

### Liste des projets

La page de liste des projets vous permet de gérer vos réalisations :

1. Accédez à **Projets** dans le menu latéral
2. Utilisez la barre de recherche pour trouver un projet spécifique
3. Filtrez les projets par catégorie
4. Cliquez sur **Nouveau projet** pour créer un projet

### Création d'un projet

Pour créer un nouveau projet :

1. Cliquez sur **Nouveau projet**
2. Remplissez les champs du formulaire :
   - **Titre** : Nom du projet
   - **Client** : Nom du client
   - **Catégorie** : Type de projet
   - **Date** : Date de réalisation
   - **Image principale** : Sélectionnez une image depuis la bibliothèque de médias
   - **Galerie d'images** : Ajoutez plusieurs images pour illustrer le projet
   - **URL** : Lien vers le site web du projet
   - **Description** : Résumé court du projet
   - **Contenu** : Description détaillée du projet (format Markdown)
3. Cochez **Projet mis en avant** si vous souhaitez le mettre en avant sur la page d'accueil
4. Cliquez sur **Enregistrer**

### Modification d'un projet

Pour modifier un projet existant :

1. Trouvez le projet dans la liste
2. Cliquez sur l'icône de crayon (Modifier)
3. Modifiez les champs nécessaires
4. Cliquez sur **Enregistrer**

## Bibliothèque de médias

La bibliothèque de médias vous permet de gérer toutes les images utilisées sur votre site :

### Accès à la bibliothèque

1. Accédez à **Médias** dans le menu latéral
2. Vous verrez toutes les images disponibles sous forme de grille

### Téléchargement d'images

Pour ajouter une nouvelle image :

1. Cliquez sur **Ajouter une image**
2. Sélectionnez un fichier image sur votre ordinateur
3. L'image sera téléchargée et apparaîtra dans la bibliothèque

### Utilisation des images

Pour utiliser une image dans un contenu :

1. Lors de l'édition d'une formation, article, projet, etc.
2. Cliquez sur **Sélectionner une image** dans le champ correspondant
3. Une fenêtre modale s'ouvrira avec la bibliothèque de médias
4. Recherchez et sélectionnez l'image souhaitée
5. L'image sera automatiquement intégrée au contenu

### Gestion des images

- Pour voir les détails d'une image, cliquez dessus
- Pour supprimer une image, cliquez sur l'icône de corbeille
- Pour télécharger une image, cliquez sur l'icône de téléchargement

## Espace apprenant

L'espace apprenant vous permet de gérer les documents administratifs liés à vos formations pour chaque apprenant :

### Liste des apprenants

1. Accédez à **Apprenants** dans le menu latéral
2. Vous verrez tous vos apprenants avec leurs informations principales
3. Utilisez la barre de recherche pour trouver un apprenant spécifique
4. Filtrez les apprenants par statut (Terminée, En cours, À venir)

### Détails d'un apprenant

Pour voir les détails d'un apprenant et ses documents :

1. Cliquez sur l'icône de document à côté du nom de l'apprenant
2. Vous accéderez à la page de détail avec :
   - Informations personnelles (nom, email, entreprise, téléphone)
   - Détails de la formation (nom, dates, statut)
   - Documents organisés par catégorie

### Ajout de documents

Pour ajouter un document à un apprenant :

1. Sur la page de détail de l'apprenant, cliquez sur **Ajouter un document**
2. Sélectionnez le type de document :
   - Devis
   - Convention
   - Facture
   - Feuille d'émargement
   - Certificat de réalisation
   - Bilan de fin de formation
3. Téléchargez le fichier (PDF, DOC ou DOCX)
4. Cliquez sur **Télécharger**

### Consultation des documents

Pour consulter un document :

1. Sur la page de détail de l'apprenant, trouvez le document dans sa catégorie
2. Cliquez sur **Voir** pour ouvrir le document dans un nouvel onglet

## Paramètres

La page des paramètres vous permet de configurer les options générales du site :

1. Accédez à **Paramètres** dans le menu latéral
2. Modifiez les informations du site :
   - **Nom du site** : Nom affiché dans l'en-tête et le pied de page
   - **Description** : Description courte du site
   - **Email de contact** : Email affiché sur la page de contact
   - **Téléphone** : Numéro de téléphone affiché sur le site
   - **Adresse** : Adresse physique
   - **Réseaux sociaux** : Liens vers vos profils sociaux
3. Cliquez sur **Enregistrer les modifications**

---

## Conseils d'utilisation

### Format Markdown

Le contenu des formations, articles et projets utilise le format Markdown. Voici quelques exemples de syntaxe :

```markdown
# Titre principal
## Sous-titre
### Sous-sous-titre

Texte en **gras** ou en *italique*

- Liste à puces
- Deuxième élément

1. Liste numérotée
2. Deuxième élément

[Texte du lien](https://www.exemple.com)

![Texte alternatif de l'image](/chemin/vers/image.jpg)
```

### Optimisation des images

Pour de meilleures performances :
- Redimensionnez vos images avant de les télécharger
- Utilisez des formats optimisés (JPEG pour les photos, PNG pour les graphiques)
- Visez une taille de fichier inférieure à 500 Ko

### Sauvegarde régulière

Pensez à sauvegarder régulièrement votre travail en cliquant sur **Enregistrer** lors de l'édition de contenu.

---

*Ce manuel a été créé le 15 avril 2025 pour le site Gestionmax.*
