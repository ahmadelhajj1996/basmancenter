import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  Phone,
  MessageCircle,
  X,
  ChevronUp,
} from "lucide-react";

const CombinedComponent = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language.slice(0, 2)

  // Memoized contact options
  const contactOptions = useMemo(
    () => [
      {
        id: "phone",
        icon: () => <Phone color="white" size={28} />,
        label: "Call Us",
        color: "bg-cyan-500 hover:bg-cyan-600",
        action: () => window.open("tel:+97167414199"),
      },
      {
        id: "whatsapp",
        icon: () => <MessageCircle color="white" size={28} />,
        label: "WhatsApp",
        color: "bg-cyan-500 hover:bg-cyan-600",
        action: () => window.open("https://wa.me/971547655769"),
      },
    ],
    [],
  );

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Contact click handler
  const handleContactClick = useCallback(
    (action) => {
      action();
      if (isMobile) {
        setIsContactOpen(false);
      }
    },
    [isMobile],
  );

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleContactMenu = useCallback(() => {
    setIsContactOpen((prev) => !prev);
  }, []);

  const closeContactMenu = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  const langPositionClass = isMobile ? "top-2 end-3" : "top-4 end-4";

  const lLangPositionClass = isMobile ? "top-2 left-3" : "top-4 left-4";

  const buttonPositionClass = isMobile ? "bottom-2 end-3" : "bottom-8 end-4";

  const backToTopPositionClass = isMobile
    ? "bottom-2 start-3"
    : "bottom-8 start-4";

  const contactMenuPositionClass = isMobile
    ? "bottom-20 end-3"
    : "bottom-24 end-4";

 const handleLangChange = (lang) => {
  i18n.changeLanguage(lang);
  // Immediately update direction
  document.dir = lang === "ar" ? "rtl" : "ltr";
};


  return (
    <>
      {lang == "en" ? (
        <button
          onClick={() => handleLangChange('ar')}
          className={`
            fixed z-40 flex items-center justify-center
            transition-all bg-cyan-500 hover:bg-cyan-700 duration-300 ease-in-out
            shadow-lg hover:shadow-xl rounded-full w-12 h-12 text-white
            ${langPositionClass}
            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
          `}
          aria-label="Scroll to top"
        >
          {"AR"}
        </button>
      ) : (
        <button
          onClick={()=>handleLangChange('en')}
          className={`
            fixed z-40 flex items-center justify-center
            transition-all bg-cyan-500 hover:bg-cyan-700 duration-300 ease-in-out
            shadow-lg hover:shadow-xl rounded-full w-12 h-12 text-white
            ${lLangPositionClass}
            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
          `}
          aria-label="Scroll to top"
        >
          {"EN"}
        </button>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className={`
            fixed z-40 flex items-center justify-center
            transition-all bg-cyan-500 hover:bg-cyan-700 duration-300 ease-in-out
            shadow-lg hover:shadow-xl rounded-full w-12 h-12
            ${backToTopPositionClass}
            focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
          `}
          aria-label="Scroll to top"
        >
          <ChevronUp color="white" className="text-white w-6 h-6" />
        </button>
      )}

      {/* Contact Menu Toggle Button */}
      <button
        onClick={toggleContactMenu}
        className={`
          fixed z-50 flex items-center justify-center
          transition-all bg-cyan-500 hover:bg-cyan-700 duration-300 ease-in-out
          shadow-lg hover:shadow-xl rounded-full w-12 h-12
          ${buttonPositionClass}
          focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
        `}
        aria-label={
          isContactOpen ? "Close contact options" : "Open contact options"
        }
      >
        {isContactOpen ? (
          <X
            color="white"
            className={`text-white ${isMobile ? "w-6 h-6" : "w-7 h-7"}`}
          />
        ) : (
          <MessageCircle
            color="white"
            className={`text-white ${isMobile ? "w-6 h-6" : "w-7 h-7"}`}
          />
        )}
      </button>

      {/* Overlay */}
      {isContactOpen && (
        <div
          className="fixed inset-0 z-40 "
          onClick={closeContactMenu}
          aria-hidden="true"
        />
      )}

      {/* Contact Options Menu */}
      <div
        className={`
          fixed z-40
          transition-all duration-300 ease-in-out
          ${contactMenuPositionClass}
          ${
            isContactOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 translate-y-10 invisible"
          }
        `}
      >
        <div className="flex flex-col items-end gap-4">
          {/* Desktop Layout */}
          {!isMobile && (
            <div className="rounded-2xl shadow-2xl     ">
              <div className="space-y-3">
                {contactOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleContactClick(option.action)}
                    className={`
                      flex justify-center items-center
                      w-12 h-12 rounded-full
                      transition-all duration-200
                      ${option.color.replace("hover:", "")} 
                      text-white
                      hover:scale-110 hover:shadow-lg
                      active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                    `}
                    aria-label={option.label}
                  >
                    <option.icon className="w-8 h-8" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Layout */}
          {isMobile && (
            <div className="flex flex-col items-end gap-3">
              {contactOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleContactClick(option.action)}
                  className={`
                    flex items-center justify-center
                    w-12 h-12 rounded-full
                    transition-all duration-300 transform
                    ${
                      isContactOpen
                        ? "translate-x-0 opacity-100 scale-100"
                        : "translate-x-10 opacity-0 scale-50"
                    }
                    ${option.color.replace("hover:", "")} 
                    text-white shadow-lg
                    hover:scale-105 hover:shadow-xl
                    active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                  `}
                  style={{
                    transitionDelay: isContactOpen
                      ? `${index * 100}ms`
                      : `${(contactOptions.length - 1 - index) * 50}ms`,
                  }}
                  aria-label={option.label}
                >
                  <option.icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CombinedComponent;
