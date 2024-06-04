import { useTranslation } from 'react-i18next';
import styles from "../style";
import { myphoto } from "../assets";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            {t('hero.name')} <br className="sm:block hidden" />{" "}
            <span className="text-secondary">{t('hero.surname')}</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
          </div>
        </div>

        <h1 className="font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          {t('hero.job_title')}
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          {t('hero.description')}
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <div className="relative w-96	h-96">
          <img
            src={myphoto}
            alt="billing"
            className="w-full h-full object-cover object-top rounded-full border-4 border-yellow-500"
          />
        </div>

        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20" />
      </div>
    </section>
  );
};

export default Hero;
