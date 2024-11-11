import { userMongooseModel as User } from "../models/User.js";
import logger from "../utils/logger.js";

export const getUsers = async (req, res, next) => {
  /**
   * Fonction pour récupérer les utilisateurs de la base de données avec pagination.
   *
   * Elle prend les paramètres de pagination (page et limit) à partir de la requête et récupère
   * les utilisateurs en utilisant ces paramètres. Elle renvoie également des informations sur la
   * pagination, comme le nombre total d'utilisateurs, le nombre total de pages et la page actuelle.
   *
   * Paramètres :
   * - req (Request) : Requête HTTP contenant les paramètres de pagination (page, limit).
   * - res (Response) : Réponse HTTP qui sera renvoyée au client avec la liste des utilisateurs et les informations de pagination.
   * - next (Function) : Fonction pour passer à l'étape suivante en cas d'erreur.
   *
   * Retour :
   * - En cas de succès, une réponse HTTP 200 avec la liste des utilisateurs et des informations de pagination.
   * - En cas d'erreur, une réponse d'erreur avec un message spécifique.
   */
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.find({}, "firstName lastName email")
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit))
      .exec();

    const count = await User.countDocuments();
    return res.status(200).json({
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    logger.error(`Error retrieving users: ${error.message}`, { error });
    next(new Error("Failed to retrieve users"));
  }
};
