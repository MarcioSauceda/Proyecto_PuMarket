// src/components/admin/AdminStatsCard.jsx
const AdminStatsCard = ({ title, value, icon, bgColor }) => (
  <div
    className={`p-6 transition-shadow bg-white border shadow-sm rounded-xl ${bgColor}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-greylight">{title}</p>
        <p className="mt-2 text-3xl font-bold text-textdark">{value}</p>
      </div>
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-opacity-20">
        {icon}
      </div>
    </div>
  </div>
);

export default AdminStatsCard;
