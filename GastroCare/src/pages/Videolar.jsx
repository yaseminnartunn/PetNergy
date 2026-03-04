import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Video, Play, Clock, BookOpen, ChevronRight } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Gastrostomi Tüpü Bakımı - Temel",
    duration: "5:30",
    category: "Bakım",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop",
    description: "Gastrostomi tüpünün günlük bakımı nasıl yapılır? Adım adım rehber.",
    youtubeId: null,
  },
  {
    id: 2,
    title: "Bolus Beslenme Tekniği",
    duration: "7:15",
    category: "Beslenme",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=225&fit=crop",
    description: "Şırınga ile bolus beslenme nasıl güvenli şekilde yapılır.",
    youtubeId: null,
  },
  {
    id: 3,
    title: "Cilt Bakımı ve Enfeksiyon Önleme",
    duration: "4:45",
    category: "Bakım",
    thumbnail: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&h=225&fit=crop",
    description: "Stoma çevresinin temiz tutulması ve enfeksiyon belirtileri.",
    youtubeId: null,
  },
  {
    id: 4,
    title: "Pompa ile Gece Beslenmesi",
    duration: "6:00",
    category: "Beslenme",
    thumbnail: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=225&fit=crop",
    description: "Beslenme pompası kurulumu ve gece beslenmesi uygulaması.",
    youtubeId: null,
  },
  {
    id: 5,
    title: "Tüp Tıkanıklığında Yapılacaklar",
    duration: "3:20",
    category: "Acil Durum",
    thumbnail: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=225&fit=crop",
    description: "Tüp tıkandığında adım adım ne yapmalısınız?",
    youtubeId: null,
  },
  {
    id: 6,
    title: "İlaç Verme Teknikleri",
    duration: "5:10",
    category: "İlaç",
    thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=225&fit=crop",
    description: "Gastrostomi tüpü üzerinden güvenli ilaç verme yöntemleri.",
    youtubeId: null,
  },
];

const categoryColors = {
  Bakım: "bg-blue-100 text-blue-700",
  Beslenme: "bg-green-100 text-green-700",
  "Acil Durum": "bg-red-100 text-red-700",
  İlaç: "bg-purple-100 text-purple-700",
};

const categories = ["Tümü", "Bakım", "Beslenme", "Acil Durum", "İlaç"];

export default function Videolar() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filtered = activeCategory === "Tümü" ? videos : videos.filter((v) => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-white/80 mb-4 hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-1" /> Geri
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Eğitim Videoları</h1>
              <p className="text-white/70 text-sm">{videos.length} video mevcut</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video list */}
        <div className="space-y-3">
          {filtered.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVideo(v)}
              className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow"
            >
              <div className="flex">
                <div className="w-28 h-20 bg-gray-100 flex-shrink-0 relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="p-3 flex-1">
                  <div className="flex items-start gap-2">
                    <h3 className="font-semibold text-gray-800 leading-snug flex-1">{v.title}</h3>
                    <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{v.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${categoryColors[v.category]}`}>
                      {v.category}
                    </span>
                    <span className="text-xs text-gray-500 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {v.duration}
                    </span>
                    <span className="text-xs text-gray-500 inline-flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Eğitim
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedVideo && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <div className="font-bold text-indigo-900">{selectedVideo.title}</div>
            <div className="text-sm text-indigo-800 mt-1">
              Bu kart şimdilik örnek. İstersen buraya YouTube oynatıcı / modal ekleyebiliriz.
            </div>
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="mt-3 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Kapat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}