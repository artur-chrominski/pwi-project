import React, { useState } from 'react';
import styles from "../style";
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

const Gallery = () => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'src/assets/galleryimage1.jpeg',
    'src/assets/galleryimage2.png',
    'src/assets/galleryimage3.webp',
    'src/assets/galleryimage4.avif',
    'src/assets/galleryimage5.webp',
  ];

  const openModal = (src) => {
    setSelectedImage(src);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <section id="gallery-realization" className={`${styles.paddingY}`}>
      <div className={`${styles.boxWidth} text-center`}>
        <h2 className="text-white font-bold text-center text-5xl mb-12">
          {t('gallery.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full h-64 overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(src)}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false} 
      >
        <button onClick={closeModal} className="close-button">X</button>
        {selectedImage && <img src={selectedImage} alt="Selected" className="w-full h-auto" />}
      </Modal>
    </section>
  );
};

export default Gallery;
