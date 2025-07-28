import React from "react";

const AdminStatsCard = ({
  title,
  value,
  percentage,
  iconClass,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="p-6 transition-shadow bg-white border shadow-sm rounded-xl border-greylight hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-greylight">{title}</p>
          <p className="mt-2 text-3xl font-bold text-textdark">{value}</p>
          <div className="flex items-center mt-2">
            <span className="flex items-center text-sm font-medium text-green-600">
              <i className="mr-1 fas fa-arrow-up"></i>
              {percentage}
            </span>
            <span className="ml-2 text-sm text-greylight">vs último mes</span>
          </div>
        </div>
        <div
          className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          <i className={`${iconClass} ${iconColor} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsCard;
