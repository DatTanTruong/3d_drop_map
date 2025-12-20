
import React from "react";
import ScrollToTop from "../routes/ScrollToTop";
import { Routes, Route } from "react-router-dom";
import Customizer from '../features/customizer/pages/CustomizerPage.jsx';
const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Customizer />} />
      </Routes>
    </>
  );
};

export default AppRouter;
