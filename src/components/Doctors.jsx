import Urology from "../assets/Urology.png";

import Basman from "../assets/Basman.jpeg";
import Avatar from "../assets/Avatar.jpeg";
import Wavatar   from "../assets/Wavatar.jpeg";

import { useTranslation } from "react-i18next";


function Doctors() {
  const { t } = useTranslation();

  return (
    <section className=" container ">
      <div className="max-w-3xl lg:max-w-6xl mx-auto text-center flex flex-col gap-y-10  tracking-wider">
        <h2 className=" title">{t('doctors.title')}</h2>
        <div className=" grid grid-cols-1 min-[425px]:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-8  justify-center">
          <div className=" flex flex-col gap-y-2 justify-center border-2 pt-2 pb-4">
            <img
              src={Basman}
              loading="eager"
              className=" w-[90%] rounded-3xl mx-auto  h-[220px]"
            />
            <p className=" font-semibold"> {t('doctors.basman')} </p>
            <p className=" description"> {t('doctors.Urology')} </p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pt-2 pb-4">
            <img
              src={Wavatar}
              // alt="Roula"
              loading="eager"
              className=" w-full  rounded-2xl mx-auto  h-[230px]"
            />
            <p className=" font-semibold">{t('doctors.roula')} </p>
            <p className=" description"> {t('doctors.Gynecology')} </p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pt-2 pb-4">
            <img
              src={Avatar}
              // alt="Roula"
              loading="eager"
              className=" w-[90%] rounded-3xl mx-auto  h-[220px]"
            />
            <p className=" font-semibold"> {t('doctors.tawfiq')} </p>
            <p className=" description"> {t('doctors.General')} </p>
          </div>
          <div className=" flex flex-col gap-y-2 justify-center border-2 pt-2 pb-4">
            <img
              src={Avatar}
              // alt="Roula"
              loading="eager"
              className=" w-[90%] rounded-3xl mx-auto  h-[220px]"
            />
            <p className=" font-semibold"> {t('doctors.Mohamed')} </p>
            <p className=" description"> {t('doctors.Neurological')} </p>
          </div>
          <div className=" flex flex-col gap-y-2 justify-center border-2 pt-2 pb-4">
            <img
              src={Avatar}
              // alt="Roula"
              loading="eager"
              className=" w-[90%] rounded-3xl mx-auto  h-[220px]"
            />
            <p className=" font-semibold"> {t('doctors.Hasab')} </p>
            <p className=" description"> {t('doctors.Internal')}  </p>
          </div>
          <div className=" flex flex-col gap-y-2 justify-center border-2 pt-2 pb-4">
            <img
              src={Avatar}
              // alt="Roula"
              loading="eager"
              className=" w-[90%] rounded-3xl mx-auto  h-[220px]"
            />
            <p className=" font-semibold"> {t('doctors.Mohsen')} </p>
            <p className=" description"> {t('doctors.Cosmetic')}  </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Doctors;
