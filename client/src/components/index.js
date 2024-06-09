import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";

export {
  Navbar,
  Footer,
  Hero,
};

document.addEventListener('DOMContentLoaded', () => {
  const slickList = document.querySelector('.slick-list');
  const slickSlideImage = document.querySelector('.slick-slide img');

  if (slickList) {
      slickList.addEventListener('dragstart', () => {
          slickList.style.cursor = 'pointer';
      });

      slickList.addEventListener('dragend', () => {
          slickList.style.cursor = 'default';
      });
  }

  if (slickSlideImage) {
      const setDraggingStyle = () => {
          slickSlideImage.style.pointerEvents = 'none';
      };

      const resetDraggingStyle = () => {
          slickSlideImage.style.pointerEvents = 'auto';
      };

      slickSlideImage.addEventListener('dragstart', setDraggingStyle);
      slickSlideImage.addEventListener('dragend', resetDraggingStyle);
  }
});
