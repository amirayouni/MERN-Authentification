import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();
let app = express();

connectDB();
/**
 * Middleware de sécurité Helmet pour sécuriser l'application en ajoutant des en-têtes HTTP.
 *
 * Helmet aide à protéger l'application contre divers types d'attaques en ajustant les en-têtes HTTP.
 */
app.use(helmet());
/**
 * Middleware CORS pour permettre les requêtes croisées entre différents domaines.
 *
 * CORS (Cross-Origin Resource Sharing) est utilisé pour permettre aux ressources de l'application
 * d'être accessibles à partir de domaines différents de celui où le serveur est exécuté.
 */
app.use(cors());

const limiter = rateLimit({
  /**
   * Middleware de limitation de débit pour éviter les abus en limitant le nombre de requêtes autorisées
   * depuis une même adresse IP sur une période donnée.
   *
   * Paramètres :
   * - `windowMs` : La fenêtre de temps pour la limitation, ici définie à 15 minutes (15 * 60 * 1000 ms).
   * - `max` : Le nombre maximal de requêtes autorisées dans la fenêtre de temps, ici 100 requêtes.
   * - `message` : Le message de réponse retourné lorsqu'un utilisateur dépasse la limite de requêtes.
   */
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.get("/", (req, res) => res.json({ msg: "Hello" }));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
