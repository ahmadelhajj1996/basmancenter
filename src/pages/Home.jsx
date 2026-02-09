import Reserve from "../components/Reserve";
import Map from "../components/Map";
import About from "../components/About";
import Service from "../components/Services";
import Doctors from "../components/Doctors";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Backtop from "../components/Backtop";

function Home() {
  
  
  const handleClick = () => {
    const reserveSection = document.getElementById("reserve-section");
    if (reserveSection) {
      reserveSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div>
        <Hero handleClick={handleClick} />
        <About />
        <Service />
        <Doctors />
        <Map />
        <div id="reserve-section">
          <Reserve />
        </div>
        <Footer />
      </div>
      <Backtop />

    </>
  );
}

export default Home;
