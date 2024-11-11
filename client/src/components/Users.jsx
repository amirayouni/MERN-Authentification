import React from "react";
import Navbar from "./navBar";
import UserTable from "./userTable";
import "../style/users.css";
const User = () => {
  /**
   * Composant User qui représente la page des utilisateurs. Il affiche la barre de navigation
   * (Navbar) et le tableau des utilisateurs (UserTable) dans une page dédiée.
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Aucun
   */
  return (
    <div>
      <Navbar />
      <div className="users-page">
        <UserTable />
      </div>
    </div>
  );
};

export default User;
