import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

const categories = ["Tümü", "Temel Bilgi", "Bakım", "Beslenme", "Komplikasyon"];

const articles = [
  {
    id: 1,
    category: "Temel Bilgi",
    title: "Gastrostomi Tüpü Nedir?",
    summary: "Gastrostomi tüpü (G-tüp), karın duvarından doğrudan mideye yerleştirilen tıbbi bir cihazdır.",
    content: `Gastrostomi tüpü (G-tüp), karın duvarından doğrudan mideye yerleştirilen tıbbi bir cihazdır. Ağız yoluyla beslenemeyen çocuklara sıvı, besin ve ilaç verilmesini sağlar.\n\nG-tüp endoskopik, cerrahi veya radyolojik yöntemlerle yerleştirilebilir. En yaygın kullanılan yöntem PEG (Perkütan Endoskopik Gastrostomi) yöntemidir.\n\nTüp, uzun süreli beslenme desteği gereken durumlarda tercih edilir ve doğru bakım yapıldığında güvenle kullanılabilir.`,
  },
  {
    id: 2,
    category: "Temel Bilgi",
    title: "Çocuğunuzun Gastrostomi Tüpü ile Beslenmeye Neden Gereksinimi Vardır?",
    summary: "Çocukların büyüme ve gelişmeleri için ağız yoluyla yeterli kaloriyi alamadığı durumlarda G-tüp gerekli olabilir.",
    content: `Çocukların büyüme ve gelişmeleri için ağız yoluyla aldıkları gıdalar ile kalori ihtiyaçlarının karşılanamadığı durumlarda çocuğunuzun diğer beslenme yollarıyla bu kalori açığının kapatılması gerekir.\n\nÇocuğunuz ağız yoluyla yeterli beslenemediği durumlarda 6 haftadan uzun sürecek gastrostomi tüpü ile beslenme yolu tercih edilir.\n\nBu durumun nedenleri arasında nörolojik sorunlar, yutma güçlüğü, yüksek kalori ihtiyacı veya kronik hastalıklar sayılabilir.`,
  },
  {
    id: 3,
    category: "Bakım",
    title: "Günlük Cilt Bakımı",
    summary: "Gastrostomi bölgesinin temiz ve kuru tutulması enfeksiyonu önler. Günlük bakım rutini oluşturmak önemlidir.",
    content: `Gastrostomi bölgesini her gün hafif sabun ve suyla temizleyin. Bölgeyi iyice kurulayın — nem enfeksiyona davetiye çıkarır.\n\nBölgede kızarıklık, şişme, akıntı veya kötü koku gibi enfeksiyon belirtileri varsa hemen doktorunuza başvurun.\n\nTüpün etrafına bez veya gazlı bez yerleştirmekten kaçının, bu nem tutabilir. Tüpü günde 2-4 kez döndürün (doktor önerdiyse).`,
  },
  {
    id: 4,
    category: "Bakım",
    title: "Tüp Tıkanıklığını Önleme",
    summary: "Tüpün tıkanmaması için beslenme öncesi ve sonrası mutlaka su ile yıkayın.",
    content: `Tüpü her beslenmeden önce ve sonra ılık su (10-20 ml) ile yıkayın. İlaçları ayrı ayrı verin ve her birinin ardından su ekleyin.\n\nViskoz ilaçları mümkünse sıvı forma dönüştürün. Tüp tıkandığında panik yapmayın, ılık su ile yavaşça yıkamayı deneyin.\n\nÇözülmüyorsa doktorunuzu arayın, zorla açmaya çalışmayın.`,
  },
  {
    id: 5,
    category: "Beslenme",
    title: "Beslenme Formülleri Hakkında",
    summary: "Gastrostomi ile verilen beslenme formülleri çocuğunuzun ihtiyacına göre seçilir.",
    content: `Gastrostomi ile verilen beslenme formülleri, çocuğunuzun yaşına, kilosuna ve tıbbi durumuna göre diyetisyen tarafından belirlenir.\n\nFormüller genellikle hazır ticari ürünler olabileceği gibi, blenderize (püre edilmiş) gerçek gıdalardan da oluşabilir.\n\nBeslenme hızı, miktarı ve sıklığı sağlık ekibinizle belirlenmelidir. Asla kendi başınıza değiştirmeyin.`,
  },
  {
    id: 6,
    category: "Beslenme",
    title: "Gastrostomiye Özgü Yapılan Beslenme İşleminin Adı",
    summary: "Gastrostomi ile yapılan beslenme işlemine 'enteral beslenme' adı verilir.",
    content: `Gastrostomi ile yapılan beslenme işlemine "enteral beslenme" adı verilir. Bu, sindirim sistemini kullanarak besin sağlama yöntemidir.\n\nEnteral beslenme 3 şekilde verilebilir:\n1. Bolus (şırınga ile): Günde birkaç kez büyük miktarlarda\n2. Aralıklı (pompa ile): Belirli aralıklarla\n3. Sürekli (gece pompası): Gece boyunca yavaş yavaş\n\nHangi yöntemin kullanılacağını sağlık ekibiniz belirler.`,
  },
  {
    id: 7,
    category: "Komplikasyon",
    title: "Tüp Çıkması Durumunda Ne Yapılmalı?",
    summary: "Tüp çıkarsa bölgeyi örtün ve hemen hastaneye gidin. İlk 30 dakika kritiktir.",
    content: `Tüp aniden çıkarsa hemen hareket edin. Delik hızla kapanabilir.\n\nYapmanız gerekenler:\n1. Sakin olun\n2. Bölgeyi temiz bir bezle örtün\n3. Tüpü temiz suda saklayın (tekrar takılabilir)\n4. En yakın acil servise gidin\n5. Doktorunuzu arayın\n\nTüp çıktıktan sonra 2-4 saat içinde yerine takılmazsa delik kapanabilir ve yeniden işlem gerekebilir.`,
  },
  {
    id: 8,
    category: "Komplikasyon",
    title: "Mikroplardan Arındırılmış Olan",
    summary: "Sterilizasyon ve hijyen kuralları gastrostomi bakımının temel taşlarından biridir.",
    content: `Gastrostomi bakımında kullanılan tüm ekipmanlar steril veya temiz olmalıdır. "Steril" ve "temiz" teknik farklı kavramlardır.\n\nSteril: Tüm mikroorganizmalardan arındırılmış (yeni açılmış tıbbi malzeme)\nTemiz: Görünür kirden arındırılmış, dezenfekte edilmiş\n\nGünlük bakımda genellikle "temiz teknik" yeterlidir. Şırıngaları her kullanım sonrası sabun ve suyla yıkayın, haftada bir steril setler kullanın.`,
  },
];

export default function Bilgiler() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "Tümü" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF7F50] to-[#e8602e] px-4 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <Link to={createPageUrl("Home")} className="inline-flex items-center text-white/80 mb-4 hover:text-white">
            <ArrowLeft className="w-5 h-5 mr-1" /> Geri
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Kısa Bilgiler</h1>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Bilgi ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#FF7F50] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Sonuç bulunamadı</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  className="w-full text-left p-5"
                  onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full mb-2">
                        {article.category}
                      </span>
                      <h3 className="font-semibold text-gray-800 text-sm leading-snug">{article.title}</h3>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">{article.summary}</p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {expandedId === article.id ? (
                        <ChevronUp className="w-5 h-5 text-[#FF7F50]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>
                {expandedId === article.id && (
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <p className="text-sm text-gray-600 leading-relaxed mt-4 whitespace-pre-line">{article.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}