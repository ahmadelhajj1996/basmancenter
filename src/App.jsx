import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppRoutes from "./config/router";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check and set direction on initial render
    const currentLang = i18n.language || localStorage.getItem("i18nextLng") || "en";
    document.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  return (
    <>
      <div className="m-0 w-full min-h-screen transform-none filter-none">
        <AppRoutes />
      </div>
    </>
  );
}

export default App; 
