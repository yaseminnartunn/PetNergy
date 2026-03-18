import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export default function LevelProgress({ pet }) {
  const xp = Number(pet?.xp || 0);
  const level = Number(pet?.level || Math.floor(xp / 80) + 1);
  const xpForNext = Math.max(level * 80, 80);
  const xpProgress = (xp / xpForNext) * 100;

  return (
    <motion.div
      className="bg-white rounded-3xl p-5 shadow-lg border border-pink-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-black text-lg text-slate-800 mb-1">🏰 Ana ilerleme yolu</h3>
          <p className="text-[11px] text-slate-400">Her bakim dokunusu daha yuksek seviye ve daha parlak rozetlere cikiyor.</p>
        </div>
        <div className="ml-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex flex-col items-center justify-center shadow-inner">
          <span className="text-lg">👑</span>
          <span className="text-xs font-black text-pink-600">Lv. {level}</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-bold text-slate-500">Sonraki rozet</span>
          <Badge className="bg-gradient-to-r from-emerald-400 to-green-500 text-white border-0 text-[10px] font-bold">
            {xp} XP
          </Badge>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(xpProgress, 100)}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}