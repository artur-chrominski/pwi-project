import React from 'react';
import { useTranslation } from 'react-i18next';
import php from '../assets/php.png';
import java from '../assets/java.png';
import react from '../assets/react.png';
import angular from '../assets/angular.png';
import tailwind from '../assets/tailwind.png';
import next_js from '../assets/next_js.png';

const TechnologiesBlock = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center py-8 rounded-lg my-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <h2 className="text-white text-3xl font-bold mb-4">{t('technologies.title')}</h2>
            <p className="text-gray-400 mb-8 text-center max-w-2xl">
                {t('technologies.description')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 py-8">
                <img src={php} alt="php" className="w-16 h-16 sm:w-40 sm:h-28 object-contain" />
                <img src={java} alt="java" className="w-16 h-16 sm:w-40 sm:h-28 object-contain" />
                <img src={react} alt="react" className="w-16 h-16 sm:w-40 sm:h-28 object-contain" />
                <img src={angular} alt="angular" className="w-16 h-16 sm:w-40 sm:h-28 object-contain" />
                <img src={tailwind} alt="tailwind" className="w-16 h-16 sm:w-40 sm:h-28 object-contain" />
                <img src={next_js} alt="next_js" className="w-16 h-16 sm:w-40 sm:h-28 object-contain" />
            </div>
        </div>
    );
};

export default TechnologiesBlock;
