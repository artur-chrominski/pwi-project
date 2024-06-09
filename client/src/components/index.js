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
  const slickSlides = document.querySelectorAll('.slick-slide img');

  if (slickList) {
      slickList.classList.remove('dragging');
      slickList.style.cursor = ''; 
  }

  slickSlides.forEach(slide => {
      slide.classList.remove('dragging');
      slide.style.pointerEvents = ''; 
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
          if (mutation.type === 'attributes') {
              if (mutation.target.classList.contains('dragging')) {
                  mutation.target.classList.remove('dragging');
                  if (mutation.target.classList.contains('slick-list')) {
                      mutation.target.style.cursor = ''; 
                  }
                  if (mutation.target.tagName === 'IMG' && mutation.target.closest('.slick-slide')) {
                      mutation.target.style.pointerEvents = ''; 
                  }
              }
          }
      });
  });

  const config = { attributes: true, subtree: true };

  const slickList = document.querySelector('.slick-list');
  if (slickList) {
      observer.observe(slickList, config);
  }

  const slickSlides = document.querySelectorAll('.slick-slide img');
  slickSlides.forEach(slide => {
      observer.observe(slide, config);
  });
});
