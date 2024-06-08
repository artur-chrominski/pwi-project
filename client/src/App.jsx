import React from 'react';
import Review from './components/Review';
import styles from "./style";
import '../src/assets/i18n';
import { Footer, Navbar, Hero } from "./components";
import CookieBanner from './components/CookieBanner';
import Projects from './components/Projects';

const App = () => (
  <div id="page-wrapper" className="bg-primary w-full overflow-hidden">
    <div id="navbar" className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div id="page-content" className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
        <Review />
        <Projects />
      </div>
    </div>

    <div id="contact" className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
    <CookieBanner /> 
  </div>
);

export default App;
