import { createContext, useContext, useState } from "react";

export const AuthContex = createContext();

export const useAuthContex = () => {
  return useContext(AuthContex);
};

export const AuthContexProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [authenticatedUSer, setAuthenticateUser] = useState(null);
  return (
    <AuthContex.Provider
      value={{ isAuth, setAuth, authenticatedUSer, setAuthenticateUser }}
    >
      {children}
    </AuthContex.Provider>
  );
};
