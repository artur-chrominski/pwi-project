import React from 'react';
import Review from './components/Review';
import styles from "./style";
import '../src/assets/i18n';
import { Footer, Navbar, Hero } from "./components";
import CookieBanner from './components/CookieBanner';
import Projects from './components/Projects';
import Gallery from './components/Gallery'; 
import InfoBlock from './components/InfoBlock';
import TechnologiesBlock from './components/TechnologiesBlock';

const App = () => (
  <div id="page-wrapper" className="bg-primary w-full overflow-hidden">
    <div id="navbar" className={`px-8`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div id="page-content" className={`bg-primary ${styles.flexStart} ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
        <TechnologiesBlock />
        <Gallery /> 
        <Projects />
        <InfoBlock />
        <Review />
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
