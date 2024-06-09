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
  const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              const target = mutation.target;
              if (target.classList.contains('slick-list') && target.classList.contains('dragging')) {
                  target.classList.remove('dragging');
                  target.style.cursor = 'default'; // Nadpisuje kursor
              }
              if (target.tagName === 'IMG' && target.classList.contains('dragging')) {
                  target.classList.remove('dragging');
                  target.style.pointerEvents = 'auto'; // Nadpisuje pointer-events
              }
          }
      });
  });

  const config = { attributes: true, subtree: true, attributeFilter: ['class'] };

  const slickLists = document.querySelectorAll('.slick-list');
  slickLists.forEach(list => observer.observe(list, config));

  const slickSlideImages = document.querySelectorAll('.slick-slide img');
  slickSlideImages.forEach(image => observer.observe(image, config));
});
