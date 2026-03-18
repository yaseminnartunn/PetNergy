import React from 'react';
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const ActivityLog = () => {
  const activities = [
    { icon: "🌅", text: "Sabah patisi atildi", time: "5 dk once" },
    { icon: "🎁", text: "Mini odul hazir", time: "Bugun" },
    { icon: "🎮", text: "Oyun zamani yaklasıyor", time: "Rutin ipucu" }
  ];

  return (
    <Card className="bg-white rounded-2xl p-5 shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Anlik pet gunlugu</h3>
        <button className="flex items-center gap-1 text-sm text-teal-600 font-medium hover:text-teal-700">
          Detay
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Canli mikro kopyalarla uygulamaya daha oyuncu hissettir.</p>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:from-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activity.icon}</span>
              <p className="text-sm text-gray-700 font-medium">{activity.text}</p>
            </div>
            <span className="text-xs text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityLog;