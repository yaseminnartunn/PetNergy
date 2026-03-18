import React from 'react';

const StatBar = ({ icon, label, value, color }) => {
  const getBarColor = () => {
    const colors = {
      orange: "from-orange-400 to-red-500",
      pink: "from-pink-400 to-pink-600",
      cyan: "from-cyan-400 to-blue-500",
      purple: "from-purple-400 to-indigo-600"
    };
    return colors[color] || colors.pink;
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className="text-xs text-gray-500">Bugunku durumu dengede tut.</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`bg-gradient-to-r ${getBarColor()} h-full rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;