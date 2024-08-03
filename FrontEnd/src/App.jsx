import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignUp } from "./Pages";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
