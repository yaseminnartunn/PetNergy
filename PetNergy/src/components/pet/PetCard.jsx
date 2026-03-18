import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const PetCard = ({ pet }) => {
  const getPetEmoji = (type) => {
    const emojis = {
      "Kedi": "🐱",
      "Kopek": "🐶",
      "Balik": "🐠",
      "Mini Canavar": "👾"
    };
    return emojis[type] || "🐱";
  };

  const getAccessoryEmoji = (accessory) => {
    const emojis = {
      "Parlak Fiyonk": "🎀",
      "Mini Pelerin": "🦸",
      "Yildiz Tasma": "⭐"
    };
    return emojis[accessory] || "🎀";
  };

  const getMoodBadgeColor = (mood) => {
    const colors = {
      "Neseli": "bg-gradient-to-r from-pink-400 to-pink-500 text-white",
      "Mutlu": "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
      "Normal": "bg-gradient-to-r from-blue-400 to-cyan-400 text-white",
      "Yorgun": "bg-gradient-to-r from-purple-400 to-indigo-400 text-white",
      "Ac": "bg-gradient-to-r from-red-400 to-orange-500 text-white"
    };
    return colors[mood] || colors["Normal"];
  };

  const xpPercentage = ((pet.xp % 100) / 100) * 100;

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge className={`${getMoodBadgeColor(pet.mood)} px-3 py-1 rounded-full text-sm font-semibold mb-2 flex items-center gap-1`}>
            <Sparkles className="w-3 h-3" />
            {pet.mood}
          </Badge>
          <p className="text-xs text-teal-600 font-medium">{pet.habitat}</p>
        </div>
        <p className="text-xs text-gray-500">4 gün seri</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-xs text-indigo-400 font-semibold tracking-wider mb-1">DİJİTAL DOST</p>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{pet.name}</h2>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600 font-medium">{pet.type}</p>
            <p className="text-xs text-gray-500">Lv. {pet.level}</p>
          </div>
          
          <div className="text-7xl animate-bounce">
            {getPetEmoji(pet.type)}
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-4 italic">
          Keyif yerinde. Bir odul kazanmak icin hazir.
        </p>

        <div className="flex items-center gap-2 text-pink-500 text-sm mb-2">
          <span>{getAccessoryEmoji(pet.accessory)}</span>
          <span className="font-medium">{pet.accessory}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-600">Seviye ilerlemesi</p>
          <p className="text-xs font-semibold text-emerald-600">{pet.xp % 100} XP</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 italic">
          Bir sonraki rozet icin biraz daha ilgi gerekiyor.
        </p>
      </div>
    </Card>
  );
};

export default PetCard;