import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  token: "",
  setToken: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
