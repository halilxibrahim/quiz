import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from './App.module.css';
import Home from "./components/Home";
import MathTest from "./components/MathTest";
import VisualMemoryTest from "./components/VisualMemoryTest";
import CharacterTrackingTest from "./components/CharacterTrackingTest";
import PerceptualSpeedTest from "./components/PerceptualSpeedTest";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.navbar}>
          <div className={styles.navBrand}>Quiz</div>
          
          <button 
            className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü Aç/Kapat"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Ana Sayfa</Link>
            <Link to="/math-test" onClick={() => setMenuOpen(false)}>Zihinsel Hesaplama</Link>
            <Link to="/visual-memory-test" onClick={() => setMenuOpen(false)}>Görsel Hafıza</Link>
            <Link to="/character-tracking-test" onClick={() => setMenuOpen(false)}>Karakter İzleme</Link>
            <Link to="/perceptual-speed-test" onClick={() => setMenuOpen(false)}>Algısal Hız</Link>
          </div>
        </nav>

        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/math-test" element={<MathTest />} />
            <Route path="/visual-memory-test" element={<VisualMemoryTest />} />
            <Route
              path="/character-tracking-test"
              element={<CharacterTrackingTest />}
            />
            <Route
              path="/perceptual-speed-test"
              element={<PerceptualSpeedTest />}
            />
          </Routes>
        </div>
        <footer className={styles.footer}>
          <p>
            Powered by <a href="https://read.cv/halil.ibrahim" target="_blank" rel="noopener noreferrer">Halil İbrahim Kamacı</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
