import { FaBox, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

const ReportesPage = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="min-h-screen p-6 bg-slate-100">
          <h1 className="mb-6 text-2xl font-semibold text-textdark">
            Reportería Pu-Market
          </h1>
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
            {/* Ventas/Compras Report Card */}
            <Link to="/admin/reportes/ventas-compras" className="block">
              <div className="p-6 transition-shadow bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-greylight">
                      Total Ventas/Compras
                    </p>
                    <p className="mt-2 text-3xl font-bold text-textdark">
                      27 Productos
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary bg-opacity-10">
                    <FaDollarSign className="text-xl text-primary" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Productos Disponibles Report Card */}
            <Link to="/admin/reportes/productos-disponibles" className="block">
              <div className="p-6 transition-shadow bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-greylight">
                      Total Productos Disponibles
                    </p>
                    <p className="mt-2 text-3xl font-bold text-textdark">
                      50 Productos
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent bg-opacity-10">
                    <FaBox className="text-xl text-accent" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportesPage;
