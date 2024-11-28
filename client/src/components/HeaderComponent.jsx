import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import "./HeaderComponent.css";
import "../App.css";
import logo from "../assets/header_smartcalgary.svg";

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // Close the menu after navigation
  };

  return (
    <header>
      <div id="logo" className='logo'>
        <img src={logo} />
      </div>
      <div className="menu-container">
        {/* Hamburger Icon */}
        <button className="hamburger-button" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        {/* Navigation Menu */}
        <nav className={`header-menu ${isMenuOpen ? "open" : "closed"} universal-color`}>
          <button className="customized-button menu-item menu-item-color" onClick={() => scrollToSection("home")}>Home</button>
          <button className="customized-button menu-item menu-item-color" onClick={() => scrollToSection("map")}>Map</button>
          <button className="customized-button menu-item menu-item-color" onClick={() => scrollToSection("news")}>News Feed</button>
          <button className="customized-button menu-item menu-item-color" onClick={() => scrollToSection("contact")}>Feedback</button>
          <button className="customized-button menu-item menu-item-color" onClick={() => scrollToSection("resources")}>Resources</button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
