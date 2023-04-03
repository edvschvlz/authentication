import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../components/Pages/Home/Home";

const OtherRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OtherRoutes;
