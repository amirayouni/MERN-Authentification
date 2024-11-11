import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Point d'entrée principal de l'application React. Ce fichier configure et monte l'application dans le DOM.
 * Il enveloppe l'application dans le `QueryClientProvider` pour fournir l'accès à React Query dans toute l'application.
 * Il active également le mode strict de React pour la détection des problèmes potentiels.
 *
 * Paramètres :
 * Aucun
 *
 * Retour :
 * Aucun
 */
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
/**
 * Rendu de l'application dans le DOM, en utilisant le `QueryClientProvider` pour rendre le client React Query disponible
 * pour l'application. Le mode strict est activé pour identifier les problèmes potentiels.
 */
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
