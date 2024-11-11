import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  /**
   * Fonction pour établir une connexion à la base de données MongoDB.
   *
   * Elle tente de se connecter à la base de données MongoDB en utilisant Mongoose. En cas d'échec,
   * elle réessaie jusqu'à un maximum de 5 tentatives avec un délai de 5 secondes entre chaque tentative.
   * Si la connexion échoue après 5 tentatives, le processus est arrêté avec un code de sortie 1.
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Aucun
   */
  const maxRetries = 5;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      logger.info("MongoDB connected successfully");
      break;
    } catch (error) {
      logger.error(`MongoDB connection failed: ${error.message}. Retrying...`, {
        error,
      });
      retryCount++;

      if (retryCount === maxRetries) {
        logger.error("Max retries reached. Exiting application.");
        process.exit(1);
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

export default connectDB;
