import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Apple, Clock, Droplets, AlertCircle, CheckCircle2 } from "lucide-react";

const tabs = ["Günlük Plan", "Formüller", "İpuçları"];

const dailyPlan = [
  { time: "07:00", meal: "Sabah Beslenmesi", amount: "200 ml", type: "Bolus", notes: "Oda sıcaklığında verilmeli" },
  { time: "10:00", meal: "Ara Öğün", amount: "100 ml", type: "Bolus", notes: "Su/sıvı takviyesi" },
  { time: "12:00", meal: "Öğle Beslenmesi", amount: "200 ml", type: "Bolus", notes: "Verme hızına dikkat" },
  { time: "15:00", meal: "İkindi Arası", amount: "100 ml", type: "Bolus", notes: "İlaç varsa bu vakitte" },
  { time: "18:00", meal: "Akşam Beslenmesi", amount: "200 ml", type: "Bolus", notes: "Yavaş yavaş verin" },
  { time: "21:00", meal: "Gece Beslenmesi", amount: "150 ml", type: "Pompa", notes: "Pompa ile gece boyunca" },
];

const formulas = [
  { name: "Standart Polimerik Formül", kcal: "1.0 kcal/ml", protein: "Yüksek protein", use: "Genel kullanım", color: "bg-blue-50 border-blue-100", tag: "bg-blue-100 text-blue-700" },
  { name: "Yoğunlaştırılmış Formül", kcal: "1.5 kcal/ml", protein: "Orta protein", use: "Sıvı kısıtlaması olan çocuklar", color: "bg-purple-50 border-purple-100", tag: "bg-purple-100 text-purple-700" },
  { name: "Pediatrik Özel Formül", kcal: "1.0 kcal/ml", protein: "Pediatrik", use: "1-10 yaş çocuklar", color: "bg-green-50 border-green-100", tag: "bg-green-100 text-green-700" },
  { name: "Blenderize Diyet", kcal: "Değişken", protein: "Tam gıda", use: "Doğal gıda tercih edenler", color: "bg-orange-50 border-orange-100", tag: "bg-orange-100 text-orange-700" },
];

const tips = [
  { icon: CheckCircle2, color: "text-green-500", title: "Tüpü her beslenmeden önce ve sonra 10-20 ml ılık su ile yıkayın.", type: "do" },
  { icon: CheckCircle2, color: "text-green-500", title: "Formülü oda sıcaklığında verin, çok soğuk veya çok sıcak olmamalı.", type: "do" },
  { icon: CheckCircle2, color: "text-green-500", title: "Beslenme sırasında çocuğunuzu 30-45° açıyla yatırın.", type: "do" },
  { icon: CheckCircle2, color: "text-green-500", title: "Açılmış formülü buzdolabında en fazla 24 saat saklayın.", type: "do" },
  { icon: AlertCircle, color: "text-red-500", title: "Tüpe hızlı ve kuvvetli itmekten kaçının, mideye zarar verebilir.", type: "dont" },
  { icon: AlertCircle, color: "text-red-500", title: "Süresi geçmiş formül kullanmayın.", type: "dont" },
  { icon: AlertCircle, color: "text-red-500", title: "Tıkanma varsa zorla açmaya çalışmayın.", type: "dont" },
  { icon: AlertCircle, color: "text-red-500", title: "Doz veya formülü doktor onayı olmadan değiştirmeyin.", type: "dont" },
];

export default function Beslenme() {
  const [activeTab, setActiveTab] = useState("Günlük Plan");
  const [waterCount, setWaterCount] = useState(0);
  const waterGoal = 8;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-white/80 mb-4 hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-1" /> Geri
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Apple className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Beslenme Rehberi</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Water Tracker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-800">Su Takibi</h3>
            </div>
            <span className="text-sm text-gray-500">{waterCount}/{waterGoal} bardak</span>
          </div>
          <div className="flex gap-2 mb-3">
            {Array.from({ length: waterGoal }).map((_, i) => (
              <button
                key={i}
                onClick={() => setWaterCount(i + 1)}
                className={`flex-1 h-8 rounded-lg transition-all ${
                  i < waterCount ? "bg-blue-400" : "bg-gray-100 hover:bg-blue-100"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setWaterCount(Math.min(waterGoal, waterCount + 1))}
              className="flex-1 py-2 bg-blue-500 text-white text-sm rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              + Bardak Ekle
            </button>
            <button
              onClick={() => setWaterCount(0)}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200 transition-colors"
            >
              Sıfırla
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Günlük Plan" && (
          <div className="space-y-3">
            {dailyPlan.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4">
                <div className="flex-shrink-0 text-center">
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex flex-col items-center justify-center">
                    <Clock className="w-4 h-4 text-green-500 mb-0.5" />
                    <span className="text-xs font-bold text-green-600">{item.time}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-gray-800 text-sm">{item.meal}</h4>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex-shrink-0">{item.type}</span>
                  </div>
                  <p className="text-[#FF7F50] font-bold text-sm mt-0.5">{item.amount}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.notes}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Formüller" && (
          <div className="space-y-3">
            {formulas.map((f, i) => (
              <div key={i} className={`rounded-2xl border p-4 ${f.color}`}>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-gray-800 text-sm">{f.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${f.tag}`}>{f.kcal}</span>
                </div>
                <p className="text-gray-600 text-xs mt-1">{f.protein}</p>
                <p className="text-gray-500 text-xs mt-1 italic">📌 {f.use}</p>
              </div>
            ))}
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-xs text-orange-700 leading-relaxed">
                ⚠️ Hangi formülün kullanılacağına diyetisyen ve doktorunuz karar vermelidir. Bu bilgiler genel yönlendirme amaçlıdır.
              </p>
            </div>
          </div>
        )}

        {activeTab === "İpuçları" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 px-1">✅ Yapılması Gerekenler</h3>
              <div className="space-y-2">
                {tips.filter(t => t.type === "do").map((tip, i) => {
                  const Icon = tip.icon;
                  return (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
                      <Icon className={`w-5 h-5 ${tip.color} flex-shrink-0 mt-0.5`} />
                      <p className="text-sm text-gray-700 leading-relaxed">{tip.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 px-1">❌ Yapılmaması Gerekenler</h3>
              <div className="space-y-2">
                {tips.filter(t => t.type === "dont").map((tip, i) => {
                  const Icon = tip.icon;
                  return (
                    <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
                      <Icon className={`w-5 h-5 ${tip.color} flex-shrink-0 mt-0.5`} />
                      <p className="text-sm text-gray-700 leading-relaxed">{tip.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}