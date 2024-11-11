import axios from "axios";

const api = axios.create({
  /**
   * Configuration de l'instance Axios pour les appels API.
   * Cette instance est utilisée pour interagir avec le backend via des requêtes HTTP.
   * Elle est configurée avec une URL de base pour faciliter les requêtes vers le serveur,
   * et des en-têtes par défaut pour indiquer que le format de contenu est en JSON.
   *
   * Base URL : http://localhost:5000
   * En-têtes par défaut : Content-Type: application/json
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Une instance Axios configurée avec les paramètres de base.
   */
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
