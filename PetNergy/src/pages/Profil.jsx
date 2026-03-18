import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PetCard from '../components/pet/PetCard';
import PetCustomizer from '../components/pet/PetCustomizer';
import BottomNav from '../components/pet/BottomNav';

const Profil = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showCustomizer, setShowCustomizer] = useState(false);

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: () => base44.entities.Pet.list('-updated_date', 1)
  });

  const pet = pets[0];

  const createPetMutation = useMutation({
    mutationFn: (data) => base44.entities.Pet.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      toast.success('🎉 Evcil hayvan olusturuldu!');
      setShowCustomizer(false);
    }
  });

  const updatePetMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Pet.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      toast.success('✨ Profil guncellendi!');
      setShowCustomizer(false);
    }
  });

  const handleSave = (data) => {
    if (pet) {
      updatePetMutation.mutate({
        id: pet.id,
        data
      });
    } else {
      createPetMutation.mutate({
        ...data,
        hunger: 68,
        happiness: 74,
        energy: 58,
        bonus_xp: 26,
        level: 3,
        xp: 126,
        mood: "Neseli",
        streak_days: 4
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <button onClick={() => navigate(-1)} className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-white">Customize Pet</h1>
          <button className="text-white hover:text-yellow-300 transition-colors">
            <Sun className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {!showCustomizer ? (
            <>
              <div className="pt-2">
                <p className="text-xs text-pink-300 font-semibold tracking-wider mb-2">UI-ONLY EDITOR</p>
                <h2 className="text-3xl font-bold text-white mb-2">Evcil hayvanini kisilestiir</h2>
                <p className="text-sm text-gray-300">Bu ekranda degisiklikler sadece on izleme amaçli. Kaydedme ve kalicilik sonraki fazda eklenecek.</p>
              </div>

              {pet && <PetCard pet={pet} />}

              {pet ? (
                <Button
                  onClick={() => setShowCustomizer(true)}
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg py-6 text-base"
                >
                  Duzenle →
                </Button>
              ) : (
                <Button
                  onClick={() => setShowCustomizer(true)}
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg py-6 text-base"
                >
                  Yeni Evcil Hayvan Olustur
                </Button>
              )}
            </>
          ) : (
            <PetCustomizer 
              pet={pet || { name: "Miso", type: "Kedi", habitat: "Bulut Park", accessory: "Parlak Fiyonk" }} 
              onSave={handleSave}
            />
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profil;