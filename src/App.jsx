import React from "react";
import "./App.css";
import Logo from "./assets/logo.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from "./component/Home/Home";
import { Route, Routes } from "react-router-dom";
import Preview from "./component/Preview/Preview";
function App() {
  return (
    <div className="main-container">
      <img src={Logo} alt="" className="int-logo" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;
