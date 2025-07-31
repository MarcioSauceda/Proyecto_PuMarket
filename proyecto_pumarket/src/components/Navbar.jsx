import { useNavigate } from "react-router-dom"; // importamos useNavigate

import logoPuma from "../assets/logoPuma3.svg";

const Navbar = () => {
  const navigate = useNavigate(); // inicializamos navigate

  return (
    <nav className="flex flex-wrap justify-between items-center px-4 py-4 bg-[#002664] text-white w-full sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center overflow-visible">
          <img
            src={logoPuma}
            alt="Pumarket Logo"
            className="h-[160%] w-[160%] object-contain -ml-2"
          />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Pu-Market
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 sm:gap-4">
        <button
          onClick={() => navigate("/loginadmin")} // aquí redirigimos a /login
         className="border border-white px-4 py-2 rounded text-sm sm:text-base"

        >
          Administrador
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
