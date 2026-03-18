import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PetCard from '../components/pet/PetCard';
import StatBar from '../components/pet/StatBar';
import ActionButtons from '../components/pet/ActionButtons';
import DailyQuest from '../components/pet/DailyQuest';
import ActivityLog from '../components/pet/ActivityLog';
import BottomNav from '../components/pet/BottomNav';

const Bakim = () => {
  const queryClient = useQueryClient();

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: () => {
      // Geçici localStorage çözümü
      return Promise.resolve(JSON.parse(localStorage.getItem('pets') || '[]'));
    }
  });

  const pet = pets[0];

  const updatePetMutation = useMutation({
    mutationFn: ({ id, data }) => {
      // Geçici localStorage çözümü
      return new Promise((resolve, reject) => {
        try {
          const pets = JSON.parse(localStorage.getItem('pets') || '[]');
          const petIndex = pets.findIndex(p => p.id === id);
          if (petIndex !== -1) {
            pets[petIndex] = { ...pets[petIndex], ...data };
            localStorage.setItem('pets', JSON.stringify(pets));
            resolve(pets[petIndex]);
          } else {
            reject(new Error('Pet not found'));
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    }
  });

  const calculateMood = (hunger, happiness, energy) => {
    const avg = (hunger + happiness + energy) / 3;
    if (avg >= 80) return "Neseli";
    if (avg >= 60) return "Mutlu";
    if (avg >= 40) return "Normal";
    if (avg >= 20) return "Yorgun";
    return "Ac";
  };

  const handleFeed = () => {
    if (!pet) return;
    const newHunger = Math.min(pet.hunger + 15, 100);
    const newHappiness = Math.min(pet.happiness + 5, 100);
    const newXp = pet.xp + 5;
    const newMood = calculateMood(newHunger, newHappiness, pet.energy);
    
    updatePetMutation.mutate({
      id: pet.id,
      data: {
        hunger: newHunger,
        happiness: newHappiness,
        xp: newXp,
        mood: newMood
      }
    });
    
    toast.success('🍕 Beslendi! +5 XP', {
      description: 'Evcil hayvanin mutlu!'
    });
  };

  const handlePlay = () => {
    if (!pet) return;
    const newHappiness = Math.min(pet.happiness + 20, 100);
    const newEnergy = Math.max(pet.energy - 10, 0);
    const newXp = pet.xp + 10;
    const newMood = calculateMood(pet.hunger, newHappiness, newEnergy);
    
    updatePetMutation.mutate({
      id: pet.id,
      data: {
        happiness: newHappiness,
        energy: newEnergy,
        xp: newXp,
        mood: newMood
      }
    });
    
    toast.success('🎮 Oyun oynandi! +10 XP', {
      description: 'Evcil hayvanin cok mutlu!'
    });
  };

  const handleRest = () => {
    if (!pet) return;
    const newEnergy = Math.min(pet.energy + 25, 100);
    const newHunger = Math.max(pet.hunger - 5, 0);
    const newXp = pet.xp + 5;
    const newMood = calculateMood(newHunger, pet.happiness, newEnergy);
    
    updatePetMutation.mutate({
      id: pet.id,
      data: {
        energy: newEnergy,
        hunger: newHunger,
        xp: newXp,
        mood: newMood
      }
    });
    
    toast.success('😴 Dinlendi! +5 XP', {
      description: 'Evcil hayvanin enerjisi doldu!'
    });
  };

  const handleQuestComplete = () => {
    if (!pet || pet.happiness < 85) return;
    
    const newBonusXp = (pet.bonus_xp || 0) + 20;
    const newXp = pet.xp + 20;
    
    updatePetMutation.mutate({
      id: pet.id,
      data: {
        bonus_xp: newBonusXp,
        xp: newXp
      }
    });
    
    toast.success('✨ Gunluk gorev tamamlandi! +20 XP', {
      description: 'Harika is cikardi!'
    });
  };

  useEffect(() => {
    if (pet) {
      const interval = setInterval(() => {
        const newHunger = Math.max((pet.hunger || 50) - 1, 0);
        const newEnergy = Math.max((pet.energy || 50) - 1, 0);
        const newMood = calculateMood(newHunger, pet.happiness, newEnergy);
        
        updatePetMutation.mutate({
          id: pet.id,
          data: {
            hunger: newHunger,
            energy: newEnergy,
            mood: newMood
          }
        });
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [pet?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <p className="text-xl mb-4">Henuz evcil hayvan yok! Profil sayfasindan olustur.</p>
          <Link to="/Profile">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full px-8 py-3">
              ✨ Evcil Hayvan Oluştur
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      <div className="max-w-md mx-auto p-4 space-y-6">
        <div className="pt-4">
          <p className="text-xs text-pink-300 font-semibold tracking-wider mb-2">PROFİL VE STİL</p>
          <h1 className="text-3xl font-bold text-white mb-2">Evcil hayvan kimligi</h1>
          <p className="text-sm text-gray-300">Isim, tur ve ortam secimleri burada toplanir. Kaydedme akisi bu fazda devre disi.</p>
        </div>

        <PetCard pet={pet} />

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-1">Karakter karti</h2>
          <p className="text-sm text-gray-300 mb-4">Oyuncu ama derli toplu bir profil duzen.</p>
          
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
                🐱
              </div>
              <div>
                <h3 className="text-white font-bold">{pet.name}</h3>
                <p className="text-sm text-gray-300">{pet.type}</p>
              </div>
              <div className="ml-auto bg-teal-500/20 px-3 py-1 rounded-full">
                <p className="text-xs text-teal-300 font-medium">{pet.habitat}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bugun canli, renkli ve odul toplamaya hevesli bir ruh halinde.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">Muzik</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">Baloncuk</span>
            <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-medium">Parlak oyuncak</span>
          </div>

          <p className="text-xs text-gray-400 italic">Aksam uykusu</p>
        </div>

        <div className="space-y-3">
          <StatBar icon="🍖" label="Tokluk" value={pet.hunger} color="orange" />
          <StatBar icon="💖" label="Mutluluk" value={pet.happiness} color="pink" />
          <StatBar icon="⚡" label="Enerji" value={pet.energy} color="cyan" />
          <StatBar icon="✨" label="Bonus XP" value={pet.bonus_xp || 0} color="purple" />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Bakim aksiyonlari</h2>
            <button className="flex items-center gap-1 text-sm text-teal-300 font-medium hover:text-teal-200">
              Detay →
            </button>
          </div>
          <p className="text-sm text-gray-300 mb-4">Her dokunusun minik bir oyun dongusu gibi hissettigin.</p>
          
          <ActionButtons 
            onFeed={handleFeed}
            onPlay={handlePlay}
            onRest={handleRest}
          />
        </div>

        <DailyQuest pet={pet} onComplete={handleQuestComplete} />
        <ActivityLog />
      </div>

      <BottomNav />
    </div>
  );
};

export default Bakim;