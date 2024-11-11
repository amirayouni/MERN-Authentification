import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { CustomError } from "../middleware/errorHandler.js";

export const verifyToken = (req, res, next) => {
  /**
   * Middleware pour vérifier la validité du token JWT dans les en-têtes de la requête.
   *
   * Cette fonction récupère le token d'authentification dans l'en-tête de la requête et le vérifie
   * à l'aide de la clé secrète. Si le token est valide, elle permet à la requête de continuer en ajoutant
   * l'utilisateur (extrait du token) à l'objet `req.user`. Si le token est invalide ou manquant, elle renvoie une erreur.
   *
   * Paramètres :
   * - req (Request) : Objet de requête HTTP contenant l'en-tête "Authorization" avec le token JWT.
   * - res (Response) : Objet de réponse HTTP, non utilisé ici mais nécessaire pour la signature de la fonction.
   * - next (Function) : Fonction qui passe au middleware suivant si le token est valide, ou gère une erreur si le token est invalide.
   *
   * Retour :
   * - Si le token est valide, l'utilisateur est ajouté à `req.user` et le middleware suivant est appelé avec `next()`.
   * - Si le token est manquant ou invalide, une erreur est renvoyée avec un statut approprié.
   */
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    logger.warn("Authorization header is missing or token is not provided");
    return next(new CustomError("No token provided.", 401));
  }

  jwt.verify(token, process.env.CLE, (err, user) => {
    if (err) {
      logger.error(`Token verification failed: ${err.message}`);
      return next(new CustomError("Invalid token.", 403));
    }

    req.user = user;
    next();
  });
};
