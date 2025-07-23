import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Benefits from "../components/Benefits";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import ProductCarousel from "../components/ProductCarousel";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <Benefits />
      <HowItWorks />
      <ProductCarousel />
      <Footer />
    </div>
  );
};

export default LandingPage;
