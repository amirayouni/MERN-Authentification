import express from "express";
import { register, login } from "../controllers/authController.js";
import { body, validationResult } from "express-validator";
import { errorHandler } from "../middleware/errorHandler.js";

const router = express.Router();

const validateRegistration = [
  /**
   * Validation des données pour l'inscription.
   *
   * Cette validation vérifie que l'email est au bon format, que le mot de passe a une longueur minimale de 6 caractères,
   * et que les champs prénom et nom ne sont pas vides.
   *
   * Paramètres :
   * - Aucune entrée directe.
   *
   * Retour :
   * - Une série de règles de validation pour les champs d'inscription.
   */
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
];

const validateLogin = [
  /**
   * Validation des données pour la connexion.
   *
   * Cette validation vérifie que l'email est au bon format et que le mot de passe n'est pas vide.
   *
   * Paramètres :
   * - Aucune entrée directe.
   *
   * Retour :
   * - Une série de règles de validation pour les champs de connexion.
   */
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register", validateRegistration, async (req, res, next) => {
  /**
   * Route pour l'inscription des utilisateurs.
   *
   * Cette route permet à un nouvel utilisateur de s'inscrire en fournissant un email, un mot de passe, un prénom et un nom.
   * Après validation des données, les informations sont envoyées à la fonction `register` qui crée un utilisateur.
   *
   * Paramètres :
   * - req (Request) : Contient les données d'inscription de l'utilisateur.
   * - res (Response) : Utilisé pour renvoyer une réponse au client après l'inscription.
   * - next (Function) : Fonction pour passer au middleware suivant en cas d'erreur.
   *
   * Retour :
   * - Une réponse HTTP avec un message de succès ou d'erreur en cas de problème d'inscription.
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      statusCode: 400,
      message: "Validation errors occurred",
      errors: errors.array(),
    });
  }

  await register(req, res, next);
});

router.post("/login", validateLogin, async (req, res, next) => {
  /**
   * Route pour la connexion des utilisateurs.
   *
   * Cette route permet à un utilisateur existant de se connecter avec son email et son mot de passe.
   * Après validation des données, les informations sont envoyées à la fonction `login` pour authentifier l'utilisateur.
   *
   * Paramètres :
   * - req (Request) : Contient les données de connexion (email et mot de passe).
   * - res (Response) : Utilisé pour renvoyer une réponse avec le token ou un message d'erreur.
   * - next (Function) : Fonction pour passer au middleware suivant en cas d'erreur.
   *
   * Retour :
   * - Une réponse HTTP avec un token d'authentification ou un message d'erreur.
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      statusCode: 400,
      message: "Validation errors occurred",
      errors: errors.array(),
    });
  }
  await login(req, res, next);
});

router.use(errorHandler);

export default router;
