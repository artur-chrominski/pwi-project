import React from 'react';
import { useTranslation } from 'react-i18next';

const InfoBlock = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center py-16 rounded-lg my-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
      <h2 className="text-white text-4xl font-bold mb-6">{t('infoBlock.title')}</h2>
      <p className="text-gray-300 mb-8 text-center max-w-2xl text-lg">
        {t('infoBlock.description')}
      </p>
      <a href="tel:+1234567890" className="bg-yellow-500 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-yellow-600 hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
        {t('infoBlock.buttonText')}
      </a>
    </div>
  );
};

export default InfoBlock;
