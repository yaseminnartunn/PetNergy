import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusStyles = {
  Acik: {
    badge: "bg-emerald-500 text-white",
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    label: "Açık",
  },
  Kitli: {
    badge: "bg-slate-200 text-slate-700",
    iconBg: "bg-gradient-to-br from-slate-200 to-slate-300",
    label: "Kilitli",
  },
};

function SingleAchievement({ achievement }) {
  if (!achievement) return null;

  const style = statusStyles[achievement.status] || statusStyles.Kitli;

  return (
    <Card className="bg-white rounded-2xl p-4 border-2 border-gray-200 hover:border-purple-300 transition-all shadow-md">
      <div className="text-center">
        <div className={`${style.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
          <span className="text-3xl">{achievement.icon}</span>
        </div>
        <Badge className={`${style.badge} text-xs px-2 py-1 rounded-full mb-2`}>
          {style.label}
        </Badge>
        <h4 className="text-sm font-bold text-gray-800 mb-1">{achievement.title}</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{achievement.description}</p>
        {achievement.progress && (
          <p className="text-xs text-gray-500 mt-2">{achievement.progress}</p>
        )}
      </div>
    </Card>
  );
}

export default function AchievementCard({ pet }) {
  const xp = Number(pet?.xp || 0);
  const hunger = Number(pet?.hunger || 0);
  const happiness = Number(pet?.happiness || 0);
  const energy = Number(pet?.energy || 0);

  const achievements = [
    {
      id: "first-bond",
      icon: "🤝",
      title: "İlk Dostluk",
      description: "Evcil hayvanınla ilk bağını kurdun.",
      status: xp > 0 ? "Acik" : "Kitli",
      progress: xp > 0 ? "Tamamlandı" : "Bakım aksiyonu yap.",
    },
    {
      id: "artist",
      icon: "🎨",
      title: "Artist İkramlık Ustası",
      description: "Açlık değerini yükselt ve ritmi koru.",
      status: hunger >= 70 ? "Acik" : "Kitli",
      progress: `${hunger}/70`,
    },
    {
      id: "mood",
      icon: "🎮",
      title: "Oyun Modu",
      description: "Mutluluğu canlandır ve parti modunu aç.",
      status: happiness >= 80 ? "Acik" : "Kitli",
      progress: `${happiness}/80`,
    },
    {
      id: "routine",
      icon: "🧩",
      title: "Rutin Yıldızı",
      description: "Bakım serini büyüt.",
      status: energy >= 60 ? "Acik" : "Kitli",
      progress: `${energy}/60`,
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-1">Basarim kartlari</h2>
      <p className="text-sm text-gray-300 mb-4">
        Kilitli ve acik oduller, production kalitesinde bir UI dili kursun.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a) => (
          <SingleAchievement key={a.id} achievement={a} />
        ))}
      </div>
    </div>
  );
}