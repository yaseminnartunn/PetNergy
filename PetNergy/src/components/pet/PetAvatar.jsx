import React from 'react';
import { motion } from 'framer-motion';

const petEmojis = {
  'Kedi': '😺',
  'Kopek': '🐶',
  'Balik': '🐠',
  'Mini Canavar': '👾',
};

const moodEmojis = {
  'Neseli': '😸',
  'Mutlu': '😊',
  'Normal': '😐',
  'Yorgun': '😴',
  'Ac': '😿',
};

const accessoryEmojis = {
  'Parlak Fiyonk': '🎀',
  'Mini Pelerin': '🦸',
  'Yildiz Tasma': '⭐',
};

export default function PetAvatar({ pet, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-28 h-28 text-6xl',
  };

  const moodBg = {
    'Neseli': 'from-amber-200 via-pink-200 to-rose-200',
    'Mutlu': 'from-green-200 via-emerald-200 to-teal-200',
    'Normal': 'from-blue-200 via-indigo-200 to-purple-200',
    'Yorgun': 'from-slate-200 via-gray-200 to-zinc-200',
    'Ac': 'from-orange-200 via-red-200 to-pink-200',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${moodBg[pet.mood] || moodBg['Normal']} flex items-center justify-center relative shadow-lg`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span>{petEmojis[pet.type] || '🐱'}</span>
      {pet.accessory && (
        <span className="absolute -bottom-1 -right-1 text-lg bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-md border border-pink-100">
          {accessoryEmojis[pet.accessory] || '✨'}
        </span>
      )}
    </motion.div>
  );
}

export { petEmojis, moodEmojis, accessoryEmojis };