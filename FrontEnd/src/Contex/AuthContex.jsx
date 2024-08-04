import { createContext, useContext, useState } from "react";

export const AuthContex = createContext();

export const useAuthContex = () => {
  return useContext(AuthContex);
};

export const AuthContexProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  return (
    <AuthContex.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContex.Provider>
  );
};
