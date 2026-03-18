import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import PetCard from '../components/pet/PetCard';
import CharacterCard from '../components/pet/CharacterCard';
import QuickSettings from '../components/pet/QuickSettings';
import BottomNav from '../components/pet/BottomNav';
import { toast } from 'sonner';

const petTypes = ['Kedi', 'Kopek', 'Balik', 'Mini Canavar'];
const habitats = ['Sehir Cati', 'Bulut Park', 'Mercan Koyu'];

function ChipSelect({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <motion.button
          key={option}
          onClick={() => onChange(option)}
          className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
            value === option
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-500 shadow-md shadow-pink-500/20'
              : 'bg-white text-slate-600 border-slate-200 hover:border-pink-300'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}

function CreatePetForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: '',
    type: 'Kedi',
    habitat: 'Bulut Park',
    hunger: 50,
    happiness: 50,
    energy: 50,
    xp: 0,
    mood: 'Mutlu'
  });

  const createMutation = useMutation({
    mutationFn: (data) => {
      // Geçici localStorage çözümü
      return new Promise((resolve, reject) => {
        try {
          const pets = JSON.parse(localStorage.getItem('pets') || '[]');
          const newPet = { ...data, id: Date.now().toString() };
          pets.push(newPet);
          localStorage.setItem('pets', JSON.stringify(pets));
          resolve(newPet);
        } catch (error) {
          reject(error);
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      toast.success('🎉 Evcil hayvan oluşturuldu!');
    },
    onError: () => {
      toast.error('❌ Evcil hayvan oluşturulamadı.');
    }
  });

  const handleCreate = () => {
    if (!form.name.trim()) {
      toast.error('⚠️ Lütfen evcil hayvanınıza bir isim verin.');
      return;
    }
    createMutation.mutate(form);
  };

  const previewPet = { ...form, id: 'preview' };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md mx-auto px-4 py-6 pb-8">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] font-bold text-pink-400 tracking-widest uppercase mb-1">🐾 YENİ EVcil HAYVAN</p>
          <h1 className="text-2xl font-black text-white">Evcil hayvan oluştur</h1>
          <p className="text-xs text-slate-400 mt-1">İlk evcil hayvanını oluştur ve maceraya başla!</p>
        </motion.div>

        {/* Preview */}
        <div className="mb-6">
          <PetCard pet={previewPet} />
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-5 shadow-lg mb-6">
          <h3 className="font-black text-lg text-slate-800 mb-1">📝 Kimlik bilgileri</h3>
          <p className="text-xs text-slate-400 mb-4">Evcil hayvanının ismini ve türünü seç.</p>
          
          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">İsim</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border-slate-200 font-bold"
              placeholder="Pet adını gir..."
            />
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Tür</label>
            <ChipSelect
              options={petTypes}
              value={form.type}
              onChange={(type) => setForm({ ...form, type })}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Habitat</label>
            <ChipSelect
              options={habitats}
              value={form.habitat}
              onChange={(habitat) => setForm({ ...form, habitat })}
            />
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreate}
          disabled={createMutation.isPending}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-full py-6 text-base shadow-lg shadow-pink-500/25"
        >
          {createMutation.isPending ? '⏳ Oluşturuluyor...' : '✨ Evcil Hayvan Oluştur'}
        </Button>
      </div>
      <BottomNav />
    </div>
  );
}

export default function Profile() {
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: () => {
      // Geçici localStorage çözümü
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
    return <CreatePetForm />;
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
          <p className="text-[10px] font-bold text-pink-400 tracking-widest uppercase mb-1">🐾 PROFIL VE STIL</p>
          <h1 className="text-2xl font-black text-white">Evcil hayvan kimligi</h1>
          <p className="text-xs text-slate-400 mt-1">Isim, tur, ortam secimleri burada toplanir. Kaydetme akisi bu fazda devre disi.</p>
        </motion.div>

        {/* Pet Card */}
        <div className="mb-6">
          <PetCard pet={pet} />
        </div>

        {/* Character Card */}
        <div className="mb-6">
          <CharacterCard pet={pet} />
        </div>

        {/* Quick Settings */}
        <div className="mb-6">
          <QuickSettings pet={pet} />
        </div>

        {/* Customize Button */}
        <Link to="/Customize">
          <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-full py-6 text-base shadow-lg shadow-pink-500/25">
            ✨ Profili Kisillestir
          </Button>
        </Link>
      </div>
      <BottomNav />
    </div>
  );
}