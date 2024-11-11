import express from "express";
import { getUsers } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { errorHandler } from "../middleware/errorHandler.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
  /**
   * Route pour récupérer la liste des utilisateurs.
   *
   * Cette route permet de récupérer les informations des utilisateurs, mais elle nécessite une authentification via un token JWT.
   * Le middleware `verifyToken` vérifie que l'utilisateur est authentifié avant d'autoriser l'accès à cette route. Ensuite, la fonction `getUsers`
   * est appelée pour obtenir les utilisateurs à partir du contrôleur et envoyer une réponse appropriée.
   *
   * Paramètres :
   * - req (Request) : Contient la requête HTTP avec les informations sur l'utilisateur authentifié.
   * - res (Response) : Utilisé pour envoyer la réponse avec la liste des utilisateurs.
   * - next (Function) : Fonction qui passe au middleware suivant (gestion des erreurs si nécessaire).
   *
   * Retour :
   * - Une réponse HTTP avec un code de statut et les utilisateurs récupérés.
   */
  try {
    await getUsers(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

export default router;
