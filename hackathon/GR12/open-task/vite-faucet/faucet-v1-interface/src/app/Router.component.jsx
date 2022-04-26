import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from "./main/about/about.component";
import Home from "./main/Home/Home.component";
import Footer from "./shared/Footer.component";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
