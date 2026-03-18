import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DailyQuest = ({ pet, onComplete }) => {
  const isQuestComplete = pet.happiness >= 85;

  return (
    <Card className="bg-white rounded-2xl p-5 shadow-md border-2 border-orange-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Gunun mini gorevi</h3>
          <p className="text-sm text-gray-600">Mutluluk barini %85 ustune tasiyip ekstra rozet puanini ac.</p>
        </div>
        <Badge className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          4 gün seri
        </Badge>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={onComplete}
          disabled={isQuestComplete}
          className={`flex-1 rounded-xl font-semibold ${
            isQuestComplete 
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' 
              : 'bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600'
          } text-white shadow-lg`}
        >
          {isQuestComplete ? '✨ Ritmi Yukselti' : '🔒 Ritmi Yukselti'}
        </Button>
        <Button 
          variant="outline"
          className="px-6 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50"
        >
          Kisilestiir
        </Button>
      </div>
    </Card>
  );
};

export default DailyQuest;