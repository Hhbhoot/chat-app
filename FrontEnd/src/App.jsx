import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Login, SignUp } from "./Pages";
import { useAuthContex } from "./Contex/AuthContex";

function App() {
  const { isAuth, setAuth, authenticatedUSer, setAuthenticateUser } =
    useAuthContex();

  useEffect(() => {
    if (localStorage?.getItem("chatapptcn")) {
      let token = localStorage.getItem("chatapptcn");
      // console.log(token);

      const validateToken = async () => {
        try {
          const response = await fetch(
            "http://localhost:8080/api/v1/auth/check",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (data.status !== "success") {
            throw new Error(data.message);
          }
          setAuth(true);
          setAuthenticateUser(data?.data?.user);
        } catch (err) {
          localStorage.removeItem("chatapptcn");
          setAuth(false);
          throw new Error("Failed to authenticate user");
        }
      };
      validateToken();
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={isAuth ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuth ? <Navigate to={"/"} /> : <SignUp />}
          />
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
