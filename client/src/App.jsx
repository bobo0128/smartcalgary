import React, { useState, useEffect } from "react";
import HeaderComponent from "./components/HeaderComponent";
import MapComponent from "./components/MapComponent";
import NewsFeedComponent from "./components/NewsFeedComponent";
import "./App.css";
import BodyComponent from "./components/BodyComponent";
import ContactUsComponent from "./components/ContactUsComponent";
import FooterComponent from "./components/FooterComponent";
import ResourcesComponent from "./components/ResourcesComponent";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowUp } from "react-icons/fa";

function App() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <HeaderComponent />
      <BodyComponent />
      <MapComponent />
      <ResourcesComponent />
      <NewsFeedComponent />
      <div id="contact" className="section-container">
        <ContactUsComponent />
      </div>

      <FooterComponent />
      {showArrow && (
        <FaArrowUp className="scroll-to-top" onClick={scrollToTop} />
      )}
    </div>
  );
}

export default App;
