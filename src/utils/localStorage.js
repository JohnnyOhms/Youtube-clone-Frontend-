export const deleteTokenFromLocalStorage = () => {
  return localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  }
  return "No Token Available";
};

export const addTokenToLocalStorage = (token) => {
  deleteTokenFromLocalStorage();
  return localStorage.setItem("token", JSON.stringify(token));
};
