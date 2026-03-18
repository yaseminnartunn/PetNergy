import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import PetCard from '../components/pet/PetCard';
import StatBar from '../components/pet/StatBar';
import ActionButtons from '../components/pet/ActionButtons';
import DailyQuest from '../components/pet/DailyQuest';
import ActivityLog from '../components/pet/ActivityLog';
import ConfettiEffect from '../components/pet/ConfettiEffect';
import BottomNav from '../components/pet/BottomNav';

function getMood(hunger, happiness, energy) {
  if (hunger < 20) return 'Ac';
  if (energy < 20) return 'Yorgun';
  if (happiness > 75) return 'Neseli';
  if (happiness > 50) return 'Mutlu';
  return 'Normal';
}

export default function Care() {
  const queryClient = useQueryClient();
  const [showConfetti, setShowConfetti] = useState(false);
  const [actionFeedback, setActionFeedback] = useState('');

  const { data: pets, isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: () => base44.entities.Pet.list(),
    initialData: [],
  });

  const pet = pets[0];

  // Create default pet if none exists
  const createPetMutation = useMutation({
    mutationFn: (data) => base44.entities.Pet.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pets'] }),
  });

  useEffect(() => {
    if (!isLoading && pets.length === 0) {
      createPetMutation.mutate({
        name: 'Miso',
        type: 'Kedi',
        habitat: 'Bulut Park',
        accessory: 'Parlak Fiyonk',
        level: 3,
        xp: 126,
        hunger: 68,
        happiness: 74,
        energy: 58,
        bonus_xp: 26,
        streak_days: 4,
        mood: 'Neseli',
      });
    }
  }, [isLoading, pets.length]);

  const updatePetMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Pet.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pets'] }),
  });

  const handleAction = useCallback((actionType) => {
    if (!pet) return;

    let updates = {};
    let xpGain = 0;
    let feedback = '';

    switch (actionType) {
      case 'feed':
        updates.hunger = Math.min(100, pet.hunger + 15);
        updates.happiness = Math.min(100, pet.happiness + 5);
        xpGain = 10;
        feedback = '🍖 Miso doydu! +15 Tokluk, +5 Mutluluk';
        break;
      case 'play':
        updates.happiness = Math.min(100, pet.happiness + 20);
        updates.energy = Math.max(0, pet.energy - 10);
        xpGain = 15;
        feedback = '🎮 Eglenceli vakit! +20 Mutluluk, -10 Enerji';
        break;
      case 'rest':
        updates.energy = Math.min(100, pet.energy + 25);
        updates.happiness = Math.min(100, pet.happiness + 3);
        xpGain = 8;
        feedback = '💤 Dinlendi! +25 Enerji, +3 Mutluluk';
        break;
    }

    const newXp = pet.xp + xpGain;
    const xpForNext = pet.level * 80;
    let newLevel = pet.level;

    if (newXp >= xpForNext) {
      newLevel = pet.level + 1;
      updates.xp = newXp - xpForNext;
      setShowConfetti(true);
      feedback += ` 🎉 SEVIYE ATLADI! Lv.${newLevel}`;
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      updates.xp = newXp;
    }

    updates.level = newLevel;
    updates.bonus_xp = Math.min(100, pet.bonus_xp + Math.floor(xpGain / 2));
    updates.mood = getMood(
      updates.hunger ?? pet.hunger,
      updates.happiness ?? pet.happiness,
      updates.energy ?? pet.energy
    );

    setActionFeedback(feedback);
    setTimeout(() => setActionFeedback(''), 3000);

    updatePetMutation.mutate({ id: pet.id, data: updates });
  }, [pet]);

  const handleBoost = useCallback(() => {
    if (!pet) return;
    handleAction('play');
    handleAction('feed');
  }, [pet, handleAction]);

  if (isLoading || !pet) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <ConfettiEffect show={showConfetti} />
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] font-bold text-pink-400 tracking-widest uppercase mb-1">🐾 BAKIM MERKEZI</p>
          <h1 className="text-2xl font-black text-white">Dijital dostuna bak</h1>
          <p className="text-xs text-slate-400 mt-1">Istatistikleri ve bakim aksiyonlari burada.</p>
        </motion.div>

        {/* Pet Card */}
        <div className="mb-5">
          <PetCard pet={pet} />
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-5">
          <StatBar type="hunger" value={pet.hunger} />
          <StatBar type="happiness" value={pet.happiness} />
          <StatBar type="energy" value={pet.energy} />
          <StatBar type="bonus_xp" value={pet.bonus_xp} />
        </div>

        {/* Action Feedback */}
        <AnimatePresence>
          {actionFeedback && (
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-3 mb-4 text-center text-sm font-bold shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {actionFeedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section title */}
        <div className="mb-3">
          <h3 className="font-black text-lg text-white">🎮 Bakim aksiyonlari</h3>
          <p className="text-xs text-slate-400">Her dokunusu minik bir oyun dongusu gibi hissetirsin.</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6">
          <ActionButtons onAction={handleAction} disabled={updatePetMutation.isPending} />
        </div>

        {/* Daily Quest */}
        <div className="mb-6">
          <DailyQuest pet={pet} onBoost={handleBoost} />
        </div>

        {/* Activity Log */}
        <ActivityLog />
      </div>
      <BottomNav />
    </div>
  );
}