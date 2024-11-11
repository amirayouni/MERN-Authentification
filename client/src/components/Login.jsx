import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/UserApi";
import EmailField from "./emailField.jsx";
import PasswordField from "./passwordField.jsx";
import CustomButton from "./customButton.jsx";
import { Snackbar, Alert } from "@mui/material";
import "../style/login.css";

const Login = () => {
  /**
   * Gère le processus de connexion de l'utilisateur en soumettant les informations d'identification
   * (email et mot de passe) à l'API d'authentification. En fonction de la réponse,
   * elle stocke le token d'authentification dans le localStorage et redirige
   * l'utilisateur vers la page /users, ou affiche un message d'erreur si les informations
   * d'identification sont invalides.
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Aucun : En cas de succès, le token est stocké et l'utilisateur est redirigé.
   * En cas d'échec, un message d'erreur est affiché dans le formulaire.
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    /**
     * Gère l'événement de soumission du formulaire. Envoie la requête de connexion au serveur
     * avec l'email et le mot de passe. Si la réponse est réussie, stocke le
     * token d'authentification et redirige l'utilisateur. Si la connexion échoue, affiche
     * un message d'erreur.
     *
     * Paramètres :
     * e (événement) : L'événement de soumission du formulaire
     *
     * Retour :
     * Aucun : En cas de succès, il stocke le token et redirige l'utilisateur. En cas d'échec,
     * il définit un message d'erreur.
     */
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;

      localStorage.setItem("authToken", token);

      setOpen(true);
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleClose = (event, reason) => {
    /**
     * Gère la fermeture du Snackbar lorsque l'utilisateur clique dessus ou après un certain délai.
     *
     * Paramètres :
     * event (événement) : L'événement qui a déclenché l'action de fermeture
     * reason (string) : La raison de la fermeture du Snackbar (par exemple, clickaway)
     *
     * Retour :
     * Aucun : Ferme le Snackbar en définissant l'état open à false
     */
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-image"></div>
        <div
          className="login-form-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="title">
            Welcome To Strateg<span>.In</span>
          </h1>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <EmailField onEmailChange={setEmail} />
            <br />
            <PasswordField
              onPasswordChange={setPassword}
              showHelperText={false}
            />
            <br />
          </form>
          <CustomButton label="Login" type="submit" onClick={handleSubmit} />
          {error && <p className="error-text">{error}</p>}
          <div className="register-link">
            <p>
              Don't have an account? <a href="/register">Register</a>
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
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
