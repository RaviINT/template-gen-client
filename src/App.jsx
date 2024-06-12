import React from "react";
import "./App.css";
import Logo from "./assets/logo.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from "./component/Home/Home";
function App() {
  return (
    <div className="main-container">
      <img src={Logo} alt="" className="int-logo" />
      <Home />
    </div>
  );
}

export default App;
