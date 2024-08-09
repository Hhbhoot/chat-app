import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContexProvider } from "./Contex/AuthContex.jsx";
import { SocketProvider } from "./Contex/SocketContex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContexProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </AuthContexProvider>
  // </React.StrictMode>
);
