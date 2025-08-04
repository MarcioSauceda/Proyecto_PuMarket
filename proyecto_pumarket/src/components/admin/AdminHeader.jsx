
const AdminHeader = () => {
  return (
    <header className="shadow bg-primary bg- border-greylight">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Dashboard Administrador
            </h1>
          </div>
          <div className="relative">
            <i className="absolute transform -translate-y-1/2 fas fa-search left-3 top-1/2 text-greylight"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
