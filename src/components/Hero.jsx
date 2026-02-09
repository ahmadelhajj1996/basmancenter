import { useTranslation } from "react-i18next";
 

import { useEffect, useState } from "react";

const Hero = ({handleClick}) => {
  const { t } = useTranslation();

  const sentences = [
    t('hero.slider1'),
    t('hero.slider2'),
    t('hero.slider3'),
    t('hero.slider4'),
    t('hero.slider5'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setIsAnimating(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div className="relative bg-cyan-600">
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="#006064"
          className="w-full -mb-1 text-white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>
      <div className="px-1 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h2 className="mb-4 font-sans font-bold text-2xl min-[375px]:text-3xl text-center tracking-tight text-white sm:text-4xl sm:leading-none">
            {t('hero.title')}
          </h2>

          <div className="mb-6 min-h-[60px] md:min-h-[72px] flex items-center justify-center">
            <p
              className={`  sub_title text-white transition-all duration-400 ease-in-out ${
                isAnimating
                  ? "opacity-100 transform translate-x-1"
                  : "opacity-0 transform -translate-x-1"
              }`}
            >
              {sentences[currentIndex]}
            </p>
          </div>

          <button
            onClick={handleClick}
            className=" text-white text-sm md:text-lg tracking-wider bg-cyan-700 hover:bg-cyan-900 w-1/2 sm:w-1/2 mx-auto flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-all duration-300 hover:opacity-90 active:scale-95"
          >
            {t('hero.booknow')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
