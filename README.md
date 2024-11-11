# TEST

## 🪧 Description

Application sécurisée de gestion des utilisateurs avec la stack MERN (MongoDB, Express.js, React.js, Node.js). Permet l'inscription, la connexion et l'accès à la liste des utilisateurs via des API sécurisées

---

## output

### Login Screen

![Login Screen](/client/src/assets/loginScreen.png)

### Register Screen

![Register Screen](/client/src/assets/registerScreen.png)

### User Screen

![User Screen](/client/src/assets/userScreen.png)

---

## Table des matières

- 🪧 [Description](#description)
- 🛠️ [Fonctionnalités](#fonctionnalités)
- 🏗️ [Stack Technologique](##stack-technologique)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 📝 [Licence](#licence)
- 📬 [Contact](#contact)

---

## 🛠️ Fonctionnalités

- **Enregistrement des Utilisateurs** : Permet aux nouveaux utilisateurs de s'inscrire en fournissant leur nom, email, mot de passe et date de naissance. Les mots de passe sont hachés de manière sécurisée avec **bcrypt**.
- **Connexion des Utilisateurs** : Les utilisateurs peuvent se connecter en fournissant leurs informations d'identification. Un **token JWT** est généré pour l'authentification.
- **Liste des Utilisateurs** : Les utilisateurs administrateurs peuvent consulter une liste paginée des utilisateurs enregistrés.
- **Authentification par Token** : Toutes les routes protégées sont sécurisées avec JWT afin d'assurer que seules les personnes autorisées peuvent y accéder.
- **Gestion des Erreurs & Journalisation** : Les messages d'erreur sont bien définis et les logs sont gérés avec **winston** pour faciliter le débogage.
- **Limitation du Nombre de Requêtes** : Empêche les abus en limitant le nombre de requêtes d'une même adresse IP.

---

## 🏗️ Stack Technologique

- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB (avec Mongoose pour l'ORM)
- **Authentification** : JWT (JSON Web Token)
- **Hachage des mots de passe** : bcrypt
- **Journalisation** : Winston
- **Limitation des requêtes** : express-rate-limit
- **Validation** : express-validator

---

## 📦 Prérequis

Avant de pouvoir utiliser ce projet, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (v14 ou supérieur) : environnement pour exécuter le code JavaScript côté serveur. [Documentation Node.js](https://nodejs.org/)
- **MongoDB** : base de données NoSQL utilisée pour stocker les informations utilisateur. [Documentation MongoDB](https://docs.mongodb.com/)
- **NPM** : gestionnaire de paquets Node.js pour installer les dépendances. [Documentation NPM](https://docs.npmjs.com/)

---

## 🚀 Installation

### Clonez le dépôt

```bash
git clone https://github.com/amirayouni/StrategIn-techTEST.git
cd StrategIn-techTEST
```

---

### Installez les dépendances

#### Backend

```bash
cd server
npm install
```

---

#### Frontend

```bash
cd client
npm install
```

---

### Configurez le fichier .env

```env
PORT=5000
CONNECTION_STRING='votre_chaine_de_connexion_mongodb'
CLE='votre_clé_secrète_jwt'
```

---

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

---

## 📬 Contact

- Email: amirayouni41@gmail.com
