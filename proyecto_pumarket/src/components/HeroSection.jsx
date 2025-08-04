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
      <h2 className="text-3xl sm:text-6xl md:text-4xl font-bold text-white animate-typing">
      El marketplace de la comunidad{" "}
      <span className="text-8xl bg-gradient-to-r from-violet-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_1px_white]">
      UNAH
      </span>
      </h2>
        <p className="text-base sm:text-lg md:text-xl mt-4 px-2">
          Compra y vende productos entre estudiantes de forma segura, rápida y sin salir
          del campus.
        </p>
        <br />
        <div className="flex justify-center gap-4">
        <button 
        onClick={() => navigate("/login")}
        className="px-6 py-3 text-sm sm:text-base rounded bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l cursor-pointer"
        >
        Iniciar Sesión
        </button>
        <button 
        onClick={() => navigate("/register")}
        className="px-6 py-3 text-sm sm:text-base rounded bg-gradient-to-r from-violet-600 to-yellow-400 text-white font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l cursor-pointer"
        >
        Registrarse
        </button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
