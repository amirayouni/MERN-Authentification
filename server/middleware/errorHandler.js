import logger from "../utils/logger.js";

export class CustomError extends Error {
  /**
   * Classe personnalisée d'erreur qui étend la classe native Error.
   * Elle permet de créer des erreurs avec un message et un code de statut HTTP associés.
   *
   * Paramètres :
   * - message (string) : Le message d'erreur.
   * - statusCode (number) : Le code de statut HTTP associé à l'erreur (par défaut 500).
   *
   * Retour :
   * - Une instance de la classe CustomError avec les propriétés 'message' et 'statusCode'.
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  /**
   * Middleware de gestion des erreurs pour traiter les erreurs d'application et envoyer une réponse appropriée.
   *
   * Ce middleware intercepte les erreurs propagées par d'autres middlewares ou fonctions,
   * logge l'erreur avec un message et un code de statut, puis renvoie une réponse au client avec un message.
   *
   * Paramètres :
   * - err (Error) : L'erreur capturée.
   * - req (Request) : L'objet de la requête HTTP.
   * - res (Response) : L'objet de la réponse HTTP, utilisé pour renvoyer la réponse au client.
   * - next (Function) : La fonction qui passe au middleware suivant (non utilisée ici).
   *
   * Retour :
   * - Une réponse HTTP avec un code de statut et un message décrivant l'erreur.
   */
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unknown error occurred.";

  logger.error(`Error: ${message}`, { error: err });
  res.status(statusCode).json({ message });
};
