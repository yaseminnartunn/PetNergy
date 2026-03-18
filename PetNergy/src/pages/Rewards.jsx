import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import LevelProgress from '../components/pet/LevelProgress';
import AchievementCard from '../components/pet/AchievementCard';
import BottomNav from '../components/pet/BottomNav';

export default function Rewards() {
  const { data: pets, isLoading } = useQuery({
    queryKey: ['pets'],
    // Geçici localStorage çözümü - diğer sayfalarla aynı
    queryFn: () => {
      return Promise.resolve(JSON.parse(localStorage.getItem('pets') || '[]'));
    },
    initialData: [],
  });

  const pet = pets[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <p className="text-xl mb-4">Henuz evcil hayvan yok! Profil sayfasindan olustur.</p>
          <a
            href="/Profile"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full px-8 py-3"
          >
            ✨ Evcil Hayvan Oluştur
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] font-bold text-pink-400 tracking-widest uppercase mb-1">🎮 OYUNLASTIRMA</p>
          <h1 className="text-2xl font-black text-white">Rozetler ve seviye ritmi</h1>
          <p className="text-xs text-slate-400 mt-1">Bu alan, uygulamanin oyuncu hissini guclendiriyor. Su an sadece UI katmani hazir.</p>
        </motion.div>

        {/* Level Progress */}
        <div className="mb-6">
          <LevelProgress pet={pet} />
        </div>

        {/* Achievements */}
        <AchievementCard pet={pet} />
      </div>
      <BottomNav />
    </div>
  );
}