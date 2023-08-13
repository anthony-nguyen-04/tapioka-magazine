import React, { useState, useEffect } from 'react';
import Header from "./Components/Header";
import About from "./Components/About";
import Reader from './Components/Reader';
import Contact from './Components/Contact';

import './App.css';

const MOBILE_WIDTH = 850;
export const SCROLL_CHANGE_POSITION = document.documentElement.clientHeight;

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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
      <Header isMobile={isMobile} scrollPosition={scrollPosition} />
      <About isMobile={isMobile} />
      <Reader />
      <Contact />
    </div>
  );
}

export default App;
