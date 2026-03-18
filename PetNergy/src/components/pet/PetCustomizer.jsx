import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PetCustomizer = ({ pet, onSave }) => {
  const [name, setName] = useState(pet.name);
  const [type, setType] = useState(pet.type);
  const [habitat, setHabitat] = useState(pet.habitat);
  const [accessory, setAccessory] = useState(pet.accessory);

  const handleSave = () => {
    onSave({ name, type, habitat, accessory });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Kimlik bilgileri</h3>
        <p className="text-sm text-gray-600 mb-4">Isim ve tur props yapisini gorsel olarak test et.</p>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Isim</Label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-2 border-gray-200 focus:border-pink-400"
              placeholder="Miso"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Tur</Label>
            <div className="flex gap-2 flex-wrap">
              {["Kedi", "Kopek", "Balik", "Mini Canavar"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    type === t 
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Atmosfer secimi</h3>
        <p className="text-sm text-gray-600 mb-4">Renkli ve canli sunum dili burada degisir.</p>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Habitat</Label>
            <div className="flex gap-2 flex-wrap">
              {["Sehir Cati", "Bulut Park", "Mercan Koyu"].map((h) => (
                <button
                  key={h}
                  onClick={() => setHabitat(h)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    habitat === h 
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Mercan Koyu</Label>
            <div className="flex gap-2 flex-wrap">
              {["Parlak Fiyonk", "Mini Pelerin", "Yildiz Tasma"].map((a) => (
                <button
                  key={a}
                  onClick={() => setAccessory(a)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    accessory === a 
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg py-6 text-base"
          >
            Kaydet Phase 2
          </Button>
          <Button 
            variant="outline"
            className="px-6 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50"
          >
            Sifirla
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PetCustomizer;