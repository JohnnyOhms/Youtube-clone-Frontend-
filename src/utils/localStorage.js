// token
export const deleteTokenFromLocalStorage = () => {
  return localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
  const storage = localStorage.getItem("token");
  if (storage) {
    return JSON.parse(storage);
  }
  return "No Token Available";
};

export const addTokenToLocalStorage = (token) => {
  deleteTokenFromLocalStorage();
  return localStorage.setItem("token", JSON.stringify(token));
};

// user
export const deleteUserFromLocalStorage = () => {
  return localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const userCredential = localStorage.getItem("user");
  if (userCredential) {
    return JSON.parse(userCredential);
  }
};

export const addCredentialToLocalStorage = (user) => {
  deleteUserFromLocalStorage();
  return localStorage.setItem("user", JSON.stringify(user));
};
