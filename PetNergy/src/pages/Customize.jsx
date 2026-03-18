import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import PetCard from '../components/pet/PetCard';

const petTypes = ['Kedi', 'Kopek', 'Balik', 'Mini Canavar'];
const habitats = ['Sehir Cati', 'Bulut Park', 'Mercan Koyu'];
const accessories = ['Parlak Fiyonk', 'Mini Pelerin', 'Yildiz Tasma'];

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

export default function Customize() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: () => {
      // Geçici localStorage çözümü
      return Promise.resolve(JSON.parse(localStorage.getItem('pets') || '[]'));
    },
    initialData: [],
  });

  const pet = pets[0];

  const [form, setForm] = useState({
    name: '',
    type: 'Kedi',
    habitat: 'Bulut Park',
    accessory: 'Parlak Fiyonk',
  });

  useEffect(() => {
    if (pet) {
      setForm({
        name: pet.name || '',
        type: pet.type || 'Kedi',
        habitat: pet.habitat || 'Bulut Park',
        accessory: pet.accessory || 'Parlak Fiyonk',
      });
    }
  }, [pet]);

  const updateMutation = useMutation({
    mutationFn: (data) => {
      // Geçici localStorage çözümü
      return new Promise((resolve, reject) => {
        try {
          const pets = JSON.parse(localStorage.getItem('pets') || '[]');
          const petIndex = pets.findIndex(p => p.id === pet.id);
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
      navigate('/Profile');
    },
  });

  const handleSave = () => {
    updateMutation.mutate(form);
  };

  const handleReset = () => {
    if (pet) {
      setForm({
        name: pet.name || '',
        type: pet.type || 'Kedi',
        habitat: pet.habitat || 'Bulut Park',
        accessory: pet.accessory || 'Parlak Fiyonk',
      });
    }
  };

  // Preview pet with form values
  const previewPet = pet ? { ...pet, ...form } : null;

  if (isLoading || !pet) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-md mx-auto px-4 py-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/Profile">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-black text-white">✨ Customize Pet</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Section Header */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase mb-1">UI-ONLY EDITOR</p>
          <h2 className="text-xl font-black text-white">Evcil hayvanini kisillestir</h2>
          <p className="text-xs text-slate-400 mt-1">Bu ekrandaki degisiklikler sadece on izleme amacli. Kaydetme ve kalicilik sonraki fazda.</p>
        </motion.div>

        {/* Preview */}
        <div className="mb-6">
          <PetCard pet={previewPet} />
        </div>

        {/* Form: Name & Type */}
        <div className="bg-white rounded-3xl p-5 shadow-lg mb-4">
          <h3 className="font-black text-lg text-slate-800 mb-1">📝 Kimlik bilgileri</h3>
          <p className="text-xs text-slate-400 mb-4">Isim ve tur props yapisini gorsel olarak test et.</p>
          
          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Isim</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border-slate-200 font-bold"
              placeholder="Pet adini gir..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Tur</label>
            <ChipSelect
              options={petTypes}
              value={form.type}
              onChange={(type) => setForm({ ...form, type })}
            />
          </div>
        </div>

        {/* Form: Atmosphere */}
        <div className="bg-white rounded-3xl p-5 shadow-lg mb-6">
          <h3 className="font-black text-lg text-slate-800 mb-1">🌈 Atmosfer secimi</h3>
          <p className="text-xs text-slate-400 mb-4">Renkli ve canli sunum dili burada degisir.</p>

          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Habitat</label>
            <ChipSelect
              options={habitats}
              value={form.habitat}
              onChange={(habitat) => setForm({ ...form, habitat })}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Aksesuar</label>
            <ChipSelect
              options={accessories}
              value={form.accessory}
              onChange={(accessory) => setForm({ ...form, accessory })}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black rounded-full py-6 shadow-lg shadow-pink-500/25"
          >
            {updateMutation.isPending ? '⏳ Kaydediliyor...' : '💾 Kaydet Phase 2'}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="rounded-full px-8 py-6 font-bold border-slate-200"
          >
            Sifirla
          </Button>
        </div>
      </div>
    </div>
  );
}