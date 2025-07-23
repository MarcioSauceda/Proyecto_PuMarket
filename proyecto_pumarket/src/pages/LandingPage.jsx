import Benefits from "../components/Benefits";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <Benefits />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default LandingPage;
