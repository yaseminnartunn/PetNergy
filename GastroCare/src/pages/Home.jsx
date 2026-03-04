import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, Puzzle, Info, Apple, Video, Heart, ChevronRight, Star } from "lucide-react";

const navItems = [
  {
    title: "Kısa Bilgiler",
    description: "Gastrostomi hakkında temel bilgiler",
    icon: BookOpen,
    page: "Bilgiler",
    color: "from-orange-400 to-red-400",
  },
  {
    title: "Beslenme Rehberi",
    description: "Günlük beslenme planları ve öneriler",
    icon: Apple,
    page: "Beslenme",
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Eğitim Videoları",
    description: "Adım adım bakım videoları",
    icon: Video,
    page: "Videolar",
    color: "from-blue-400 to-indigo-500",
  },
  {
    title: "Bulmaca",
    description: "Öğrendiklerini test et",
    icon: Puzzle,
    page: "Bulmaca",
    color: "from-purple-400 to-pink-500",
  },
  {
    title: "Hakkında",
    description: "Uygulama ve ekip bilgileri",
    icon: Info,
    page: "Hakkinda",
    color: "from-teal-400 to-cyan-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#FF7F50] to-[#e8602e] px-6 pt-16 pb-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-lg mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-sm">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">GastroCare</h1>
          <p className="text-white/80 text-lg font-light leading-relaxed">
            Çocuğunuzun gastrostomi bakımı için güvenilir rehberiniz
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-white/90 text-sm">Uzman danışmanlığıyla hazırlandı</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-lg mx-auto px-4 -mt-10 pb-10">
        <div className="grid gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.page} to={createPageUrl(item.page)}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-8 p-4 bg-orange-50 rounded-2xl border border-orange-100 text-center">
          <p className="text-xs text-orange-600 leading-relaxed">
            Bu uygulama Arş. Gör. Yahya ERGEZEN'in doktora tezi kapsamında hazırlanmıştır.
          </p>
        </div>
      </div>
    </div>
  );
}