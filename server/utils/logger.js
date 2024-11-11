import winston from "winston";

const logger = winston.createLogger({
  /**
   * Configuration du logger avec Winston pour gérer les logs d'application.
   *
   * Winston est utilisé pour enregistrer les événements et erreurs dans l'application. Ce logger est configuré pour enregistrer les logs
   * à la fois dans la console et dans un fichier. Le format des logs inclut un timestamp et les logs sont structurés en JSON.
   *
   * Les niveaux de log sont configurés avec un niveau par défaut de "info", ce qui signifie que tous les logs de niveau "info" et supérieur
   * seront enregistrés (par exemple : "warn", "error").
   *
   * Transporteurs :
   * - `Console` : Affiche les logs dans la console.
   * - `File` : Enregistre les logs dans un fichier nommé "application.log" dans le dossier "logs".
   *
   * Retour :
   * - Un logger configuré pour être utilisé partout dans l'application afin d'enregistrer les événements et erreurs.
   */
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/application.log" }),
  ],
});

export default logger;
