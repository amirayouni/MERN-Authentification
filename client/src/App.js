import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../src/components/Login.jsx";
import Register from "../src/components/Register.jsx";
import Users from "../src/components/Users.jsx";

function App() {
  /**
   * Composant principal de l'application qui gère la configuration des routes.
   * Ce composant utilise React Router pour la gestion de la navigation entre les différentes pages de l'application.
   *
   * Routes définies :
   * - "/login" : Affiche la page de connexion (Login).
   * - "/register" : Affiche la page d'inscription (Register).
   * - "/users" : Affiche la page des utilisateurs (Users).
   * - Redirection par défaut vers "/login" si l'URL de base est "/".
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Aucun (ce composant ne retourne qu'un JSX représentant l'application et sa logique de routage).
   */
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
