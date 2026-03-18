import React from 'react';
import { Card } from "@/components/ui/card";

const ActionButtons = ({ onFeed, onPlay, onRest }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card 
        onClick={onFeed}
        className="bg-gradient-to-br from-orange-100 to-amber-100 border-2 border-orange-300 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-transform active:scale-95 shadow-md"
      >
        <div className="text-center">
          <p className="text-3xl mb-2">🍕</p>
          <p className="text-sm font-bold text-orange-800">Besle</p>
          <p className="text-xs text-orange-600 mt-1">Aclik hissini dusur, biraz da mutluluk ekle.</p>
        </div>
      </Card>

      <Card 
        onClick={onPlay}
        className="bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-300 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-transform active:scale-95 shadow-md"
      >
        <div className="text-center">
          <p className="text-3xl mb-2">🎮</p>
          <p className="text-sm font-bold text-pink-800">Oyna</p>
          <p className="text-xs text-pink-600 mt-1">Mutlulugu buyut, sahne isiklerini yak.</p>
        </div>
      </Card>

      <Card 
        onClick={onRest}
        className="bg-gradient-to-br from-cyan-100 to-blue-100 border-2 border-cyan-300 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-transform active:scale-95 shadow-md"
      >
        <div className="text-center">
          <p className="text-3xl mb-2">😴</p>
          <p className="text-sm font-bold text-cyan-800">Dinlendi</p>
          <p className="text-xs text-cyan-600 mt-1">Enerjiyi toparla, ritmi sakinlestir.</p>
        </div>
      </Card>
    </div>
  );
};

export default ActionButtons;