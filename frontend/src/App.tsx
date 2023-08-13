import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import About from "./Components/About";
import Reader from "./Components/Reader";
import Contact from "./Components/Contact";
import ImageBlock from "./Components/ImageBlock";

import imageBlockPicture from "./Assets/images/imageBlock.png";

import "./App.css";

function App() {
  const MOBILE_WIDTH = 850;
  const SCROLL_CHANGE_POSITION = window.innerHeight - 50;

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MOBILE_WIDTH);
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= MOBILE_WIDTH);
  }

  function handleScroll() {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  return (
    <div className="App">
      <Header isMobile={isMobile} scrollPosition={scrollPosition} scrollChangePosition={SCROLL_CHANGE_POSITION} />
      <About isMobile={isMobile} />
      <Reader />
      <ImageBlock imageURL={imageBlockPicture} height="60vh"/>
      <Contact />
    </div>
  );
}

export default App;
