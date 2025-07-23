import { useNavigate } from "react-router-dom"; // importamos useNavigate 
import fondo from "../assets/fondo2.jpg";

const HeroSection = () => {
const navigate = useNavigate(); // inicializamos navigate
  
return (
    <section
      className="relative bg-cover bg-center text-white h-[500px] sm:h-[600px] md:h-[700px] px-4"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundPosition: "center 30%",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          El marketplace de la comunidad UNAH
        </h2>
        <p className="text-base sm:text-lg md:text-xl mt-4 px-2">
          Compra y vende entre estudiantes de forma segura, rápida y sin salir
          del campus.
        </p>
        <button 
        onClick={() => navigate("/login")}

        className="mt-6 bg-accent text-primary px-6 py-3 rounded text-sm sm:text-base hover:bg-yellow-400 transition">  
          Explorar productos
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
