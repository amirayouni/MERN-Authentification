import api from "../api/UserApi"; //

export const fetchUsersData = async () => {
  /**
   * Fonction qui récupère la liste des utilisateurs depuis l'API.
   * Elle effectue une requête GET à l'endpoint "/users" et passe un token d'authentification
   * dans les en-têtes de la requête.
   *
   * Utilise le token d'authentification stocké dans le localStorage pour accéder aux données des utilisateurs.
   *
   * Paramètres :
   * Aucun
   *
   * Retour :
   * Promise<Array> : Une promesse qui retourne un tableau des utilisateurs si la réponse de l'API est valide.
   * Lance une erreur si le format de la réponse est incorrect.
   */
  const token = localStorage.getItem("authToken");
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);

  if (response.data && Array.isArray(response.data.users)) {
    return response.data.users;
  } else {
    throw new Error("Invalid data format received");
  }
};
