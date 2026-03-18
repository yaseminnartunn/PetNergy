import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import PetAvatar from './PetAvatar';

const favoriteItems = ['Muzik', 'Baloncuk', 'Parlak oyuncak', 'Aksam uykusu'];

export default function CharacterCard({ pet }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-black text-lg text-slate-800">🎴 Karakter karti</h3>
        <Link to="/Customize">
          <Button variant="outline" size="sm" className="rounded-full text-xs font-bold border-slate-200">
            Duzenle →
          </Button>
        </Link>
      </div>
      <p className="text-xs text-slate-400 mb-4">Oyuncu ama derli toplu bir profil duzeni.</p>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50">
        <div className="flex items-center gap-3 mb-3">
          <PetAvatar pet={pet} size="sm" />
          <div className="flex-1">
            <p className="font-black text-sm text-slate-700">{pet.name}</p>
            <p className="text-[11px] text-slate-400">{pet.type}</p>
          </div>
          <Badge variant="outline" className="text-[10px] font-medium text-slate-500 border-slate-200">
            {pet.habitat}
          </Badge>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Bugun canli, renkli ve odul toplamaya hevesli bir ruh halinde. 🌈
        </p>
        <div className="flex flex-wrap gap-1.5">
          {favoriteItems.map(item => (
            <Badge key={item} variant="outline" className="text-[10px] text-slate-500 border-slate-200">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}