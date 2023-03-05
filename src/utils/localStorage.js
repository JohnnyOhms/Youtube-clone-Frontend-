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
