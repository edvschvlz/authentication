import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Pages/Login/Login";
import Register from "../components/Pages/Register/Register";

const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;
