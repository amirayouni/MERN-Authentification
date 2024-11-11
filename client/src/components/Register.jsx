import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/UserApi";
import EmailField from "./emailField.jsx";
import { TextField } from "@mui/material";
import PasswordField from "./passwordField.jsx";
import CustomButton from "./customButton.jsx";
import { Snackbar, Alert } from "@mui/material";
import "../style/register.css";

const Register = () => {
  /**
   * Composant Register pour gérer l'inscription d'un utilisateur. Il permet à un utilisateur de s'enregistrer
   * en soumettant des informations telles que le prénom, le nom, l'email et le mot de passe. En cas de succès,
   * l'utilisateur est redirigé vers la page de connexion. En cas d'erreur, un message d'erreur est affiché.
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Aucun
   */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    /**
     * Gère la soumission du formulaire d'inscription. Lors de l'envoi des données,
     * une requête API est effectuée pour créer un nouveau compte utilisateur.
     * En cas de succès, un message de succès est affiché, et l'utilisateur est redirigé vers la page de connexion.
     * En cas d'échec, un message d'erreur est affiché.
     *
     * Paramètres :
     * e (événement) : L'événement de soumission du formulaire
     *
     * Retour :
     * Aucun : La fonction effectue la redirection ou affiche un message d'erreur.
     */
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setSuccess("Account created successfully! Redirecting to login...");
      setOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Error registering user.");
    }
  };

  const handleClose = (event, reason) => {
    /**
     * Gère la fermeture du Snackbar de succès.
     * Ce Snackbar s'affiche après une inscription réussie et disparaît après un certain temps
     * ou si l'utilisateur clique dessus.
     *
     * Paramètres :
     * event (événement) : L'événement de fermeture
     * reason (string) : La raison de la fermeture (ex : clic à l'extérieur)
     *
     * Retour :
     * Aucun : Ferme le Snackbar de succès
     */
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-image"></div>
        <div className="register-form-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="50px"
              style={{ width: "40ch" }}
            />
            <br />
            <TextField
              width="30ch"
              id="last-name"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              style={{ width: "40ch" }}
            />
          </form>
          <EmailField onEmailChange={setEmail} />
          <PasswordField onPasswordChange={setPassword} showHelperText={true} />
          <CustomButton label="Register" type="submit" onClick={handleSubmit} />
          {error && <p className="error-text">{error}</p>}
          <div className="login-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Account created successfully! Redirecting to login...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
