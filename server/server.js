import app from "../server/app.js";
/**
 * Démarrage du serveur Express.
 *
 * Ce fichier est responsable du démarrage de l'application Express en écoutant sur le port spécifié. Si aucune variable d'environnement
 * `PORT` n'est définie, il utilise le port 5000 par défaut.
 *
 * Le serveur écoute les requêtes entrantes sur le port spécifié et, une fois lancé, affiche un message dans la console pour indiquer
 * que le serveur fonctionne et sur quel port.
 *
 * Paramètres :
 * - Aucune donnée spécifique n'est reçue par cette fonction. Elle est appelée automatiquement au lancement du serveur.
 *
 * Retour :
 * - Aucun retour n'est nécessaire. Le serveur démarre et reste actif pour accepter les requêtes entrantes.
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
