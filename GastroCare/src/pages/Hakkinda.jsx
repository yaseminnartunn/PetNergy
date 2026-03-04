import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, Info, Heart, Mail, Award, BookOpen, Users } from "lucide-react";

const team = [
  {
    name: "Arş. Gör. Yahya ERGEZEN",
    role: "Geliştirici & Araştırmacı",
    description: "Bu mobil uygulama Yahya ERGEZEN'in doktora tezi kapsamında hazırlanmıştır.",
    icon: "👨‍🔬",
  },
  {
    name: "Prof. Dr. Emine EFE",
    role: "Danışman",
    description: "Projenin akademik danışmanlığını yürütmüştür.",
    icon: "👩‍⚕️",
  },
];

const sponsors = [
  "Koç Üniversitesi Semahat Arsel Hemşirelik Eğitim ve Araştırma Merkezi (SANERC)",
  "Vehbi Koç Vakfı Hemşirelik Fonu Proje Destekleme Programı",
];

const features = [
  { icon: BookOpen, label: "16 Eğitim İçeriği", desc: "Uzman onaylı bilgiler" },
  { icon: Users, label: "Ebeveyn Odaklı", desc: "Anlaşılır dil ve format" },
  { icon: Award, label: "Akademik Destek", desc: "Doktora tezi kapsamı" },
  { icon: Heart, label: "Hasta Merkezli", desc: "Aile katılımı ön planda" },
];

export default function Hakkinda() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-600 px-4 pt-12 pb-10">
        <div className="max-w-lg mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-white/80 mb-4 hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-1" /> Geri
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Hakkında</h1>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-white leading-relaxed text-sm">
              <strong>Değerli Ebeveynler,</strong>
              <br /><br />
              Çocuklarda gastrostomi bakımı ve beslenmesi konusunu kapsamlı bir şekilde ele aldığı bu mobil uygulama,
              Prof. Dr. Emine EFE'nin danışmanlığında Arş. Gör. Yahya ERGEZEN'in doktora tezi kapsamında hazırlanmıştır.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span> Uygulamamızın Amacı
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Bu mobil uygulama ile gastrostomisi olan çocukların bakımına yönelik ebeveynlerin ihtiyaç
            duydukları bilgiye erişebilmeleri amaçlanmaktadır. Gastrostomi bakımı ve beslenmesine
            yönelik <strong>16 eğitim videosu</strong> ve literatüre dayalı eğitim içeriği yer almaktadır.
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4">Uygulama Özellikleri</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-teal-50 rounded-xl p-3">
                  <Icon className="w-6 h-6 text-teal-500 mb-2" />
                  <p className="font-semibold text-gray-800 text-sm">{f.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">👥</span> Ekip
          </h2>
          <div className="space-y-3">
            {team.map((member, i) => (
              <div key={i} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="text-3xl">{member.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
                  <p className="text-teal-600 text-xs font-medium">{member.role}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-500" />
            Destekleyen Kurumlar
          </h2>
          <div className="space-y-2">
            {sponsors.map((s, i) => (
              <div key={i} className="flex gap-2 p-3 bg-teal-50 rounded-xl">
                <span className="text-teal-500 font-bold">•</span>
                <p className="text-sm text-gray-700 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gratitude */}
        <div className="bg-gradient-to-br from-[#FF7F50]/10 to-red-50 rounded-2xl border border-orange-100 p-5 text-center">
          <Heart className="w-8 h-8 text-[#FF7F50] mx-auto mb-3" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Bu uygulamayı ebeveynlerin kullanımına sunmaktan büyük mutluluk duyarız.
          </p>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Arş. Gör. Yahya ERGEZEN & Prof. Dr. Emine EFE
          </p>
        </div>
      </div>
    </div>
  );
}