import * as bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { validationResult } from "express-validator";
import logger from "../utils/logger.js";
import { userMongooseModel as User } from "../models/User.js";

export const register = async (req, res, next) => {
  /**
   * Fonction pour enregistrer un nouvel utilisateur.
   *
   * Elle valide d'abord les données de l'utilisateur (nom, prénom, email, mot de passe).
   * Ensuite, elle hache le mot de passe et enregistre l'utilisateur dans la base de données.
   * Si tout se passe bien, elle renvoie une réponse avec un message de succès.
   * En cas d'erreur, elle journalise l'erreur et renvoie une réponse d'erreur.
   *
   * Paramètres :
   * - req (Request) : Requête HTTP contenant les informations d'enregistrement de l'utilisateur.
   * - res (Response) : Réponse HTTP qui sera renvoyée au client.
   * - next (Function) : Fonction pour passer à l'étape suivante en cas d'erreur.
   *
   * Retour :
   * - En cas de succès, une réponse HTTP 201 avec un message de succès.
   * - En cas d'erreur, une réponse HTTP 400 avec les erreurs de validation ou une erreur serveur.
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn("Validation errors occurred during registration", {
      errors: errors.array(),
    });
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };

    const user = new User(data);
    await user.save();
    logger.info(`User registered successfully: ${req.body.email}`);
    return res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    logger.error(`Error while registering user: ${error.message}`, { error });
    next(new Error("Problem while adding user"));
  }
};

export const login = async (req, res, next) => {
  /**
   * Fonction pour authentifier un utilisateur lors de la connexion.
   *
   * Elle vérifie si l'email fourni existe dans la base de données et si le mot de passe fourni
   * correspond au mot de passe haché dans la base. Si l'utilisateur est authentifié, un token JWT est généré.
   * En cas d'erreur, un message d'erreur est renvoyé.
   *
   * Paramètres :
   * - req (Request) : Requête HTTP contenant les informations de connexion (email, mot de passe).
   * - res (Response) : Réponse HTTP qui sera renvoyée au client avec un token ou un message d'erreur.
   * - next (Function) : Fonction pour passer à l'étape suivante en cas d'erreur.
   *
   * Retour :
   * - En cas de succès, une réponse HTTP 200 avec un token JWT et les informations de l'utilisateur.
   * - En cas d'échec, une réponse d'erreur avec un message spécifique.
   */
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Invalid login attempt for email: ${email}`);
      return next(new Error("Email invalid"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Wrong password attempt for email: ${email}`);
      return next(new Error("Wrong Password"));
    }

    const token = jsonwebtoken.sign(
      { data: { id: user.id } },
      process.env.CLE,
      { expiresIn: "1d" }
    );

    logger.info(`User logged in successfully: ${email}`);
    return res.status(200).json({
      message: "success",
      token: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(`Error during login for email: ${email} - ${error.message}`, {
      error,
    });
    next(new Error("Server Error"));
  }
};
