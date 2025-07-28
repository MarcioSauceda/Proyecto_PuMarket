import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminStatsCard from "../../components/admin/AdminStatsCard";
import AdminLatestProducts from "../../components/admin/AdminLatestProducts";
import AdminUsersTable from "../../components/admin/AdminUsersTable";
import AdminAdditionalInfo from "../../components/admin/AdminAdditionalInfo";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <AdminStatsCard
              title="Total Ventas/Compras"
              value="27 Productos"
              percentage="12%"
              iconClass="fas fa-dollar-sign"
              bgColor="bg-primary bg-opacity-10"
              iconColor="text-primary"
            />
            <AdminStatsCard
              title="Total Usuarios Registrados"
              value="77 Usuarios"
              percentage="8%"
              iconClass="fas fa-users"
              bgColor="bg-accent bg-opacity-10"
              iconColor="text-accent"
            />
            <AdminStatsCard
              title="Total Productos Disponibles"
              value="50 Productos"
              percentage="5%"
              iconClass="fas fa-box"
              bgColor="bg-primary bg-opacity-10"
              iconColor="text-primary"
            />
          </div>
          <AdminLatestProducts />
          <AdminUsersTable />
          <AdminAdditionalInfo />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
