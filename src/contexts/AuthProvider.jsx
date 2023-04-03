import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storageUser = localStorage.getItem("user");

    if (storageUser) {
      setUser(storageUser);
    }
  }, []);

  const Login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  const Logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
