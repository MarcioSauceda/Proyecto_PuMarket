import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

const CategoriaPage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex-1 ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="min-h-screen p-6 bg-bglight">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 transition-shadow bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-greylight">
                    Total Categorías
                  </p>
                  <p className="mt-2 text-3xl font-bold text-textdark">
                    7 Categorías
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="flex items-center text-sm font-medium text-green-600">
                      <i className="mr-1 fas fa-arrow-up"></i>
                      5%
                    </span>
                    <span className="ml-2 text-sm text-greylight">
                      vs último mes
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent bg-opacity-20">
                  <i className="text-xl fas fa-box text-accent"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Categorías Disponibles */}
          <div className="bg-white rounded-xl shadow-sm border border-greylight p-6 mb-6 w-full lg:w-[290px]">
            <h3 className="mb-4 text-lg font-semibold text-textdark">
              Categorías Disponibles
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-textdark">Electrónica</span>
                <span className="text-greylight">15</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-textdark">Moda</span>
                <span className="text-greylight">8</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-textdark">Hogar</span>
                <span className="text-greylight">12</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoriaPage;
