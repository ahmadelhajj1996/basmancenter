import { useTranslation } from "react-i18next";

import Urology from "../assets/Urology.png";
import Dental from "../assets/Dental.png";
import Fetus from "../assets/Fetus.png";
import Ent from "../assets/Ent.png";
import Cardeology from "../assets/Cardeology.png";
import Cupping from "../assets/Cupping.png";
import Dermatology from "../assets/Dermatology.png";
import Neurolgy from "../assets/Neurolgy.png";

const Services = () => {
  const { t } = useTranslation();

  return (
    <section className=" container ">
      <div className="max-w-3xl lg:max-w-6xl mx-auto text-center flex flex-col gap-y-10  tracking-wider">
        <h2 className=" title">{t("services.title")} </h2>
        <div className=" grid grid-cols-1 min-[425px]:grid-cols-2  lg:grid-cols-4 gap-6 gap-y-8  justify-center">
          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img
              src={Urology}
              loading="eager"
              className=" w-full max-h-[220px]"
            />
            <p className=" font-semibold">{t("services.Urology")}</p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img
              src={Dental}
              loading="eager"
              className=" w-full max-h-[220px]"
            />
            <p className=" font-semibold"> {t("services.Dental")}</p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img
              src={Fetus}
              loading="eager"
              className=" w-full max-h-[220px]"
            />
            <p className=" font-semibold">{t("services.Fetus")}</p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img src={Ent} loading="eager" className=" w-full max-h-[220px]" />
            <p className=" font-semibold">{t("services.Ent")}</p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img
              src={Cardeology}
              loading="eager"
              className=" w-full max-h-[220px]"
            />
            <p className=" font-semibold">{t("services.Cardeology")}</p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img
              src={Cupping}
              loading="eager"
              className=" w-full max-h-[220px]"
            />
            <p className=" font-semibold">{t("services.Cupping")}</p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img
              src={Dermatology}
              loading="eager"
              className=" w-full max-h-[220px]"
            />
            <p className=" font-semibold">{t("services.Dermatology")}</p>
          </div>

          <div className=" flex flex-col gap-y-2 justify-center border-2 pb-4">
            <img
              src={Neurolgy}
              loading="eager"
              className=" w-full max-h-[220px]"
            />
            <p className=" font-semibold">{t("services.Neurolgy")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
