import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();
 
  return (
    <section className=" container ">
      <div className="max-w-3xl lg:max-w-6xl mx-auto text-center flex flex-col gap-y-8  tracking-wider">
        <h2 className=" title">{t('about.title')}</h2>
        <div className=" text-start  flex flex-col gap-y-4 text-sm md:text-lg  ">
        <p className="description">{ t('about.description1') }</p>
        <p className="description"> { t ('about.description2') }</p>
        </div>
      </div>
    </section>
  );
}

export default About;
