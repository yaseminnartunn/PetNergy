import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const settings = [
  { icon: '🏠', label: 'Habitat tonu', value: 'Bulut Park', key: 'habitat' },
  { icon: '🎀', label: 'Aksesuar', value: 'Parlak Fiyonk', key: 'accessory' },
  { icon: '✨', label: 'Rutin modu', value: 'Sabah bakimi aktif', key: 'routine' },
];

export default function QuickSettings({ pet, onEdit }) {
  return (
    <div>
      <h3 className="font-black text-lg text-slate-800 mb-1">⚡ Hizli secimler</h3>
      <p className="text-xs text-slate-400 mb-4">Tema ve aksesuar hissini tek bakista sunar.</p>
      <div className="space-y-3">
        {settings.map((setting, i) => (
          <motion.button
            key={setting.key}
            onClick={() => onEdit?.(setting.key)}
            className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-slate-50 hover:border-pink-200 transition-all text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-xl">
              {setting.icon}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-slate-700">{setting.label}</p>
              <p className="text-[11px] text-slate-400">
                {setting.key === 'habitat' ? pet.habitat : setting.key === 'accessory' ? pet.accessory : setting.value}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}