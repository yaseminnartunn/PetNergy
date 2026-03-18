# PetNergy 🐾⚡

PetNergy, **evcil hayvan bakımı + oyunlaştırma** fikrini tek bir akışta birleştiren, web ve mobil (Expo) olarak çalışan bir projedir.

- **Web**: Vite + React (UI odaklı, localStorage ile demo veri akışı)
- **Mobil**: Expo SDK 54 + React Native (Expo Go ile çalışır)

## Amaç

Kullanıcıya “bakım” aksiyonlarını (besle/oyna/dinlen) yaptırırken; XP, bonus XP, mini görev ve ödül/rozet hissiyle **oyunlaştırılmış bir deneyim** sunmak.

## Oyunlaştırma Özellikleri

PetNergy, klasik evcil hayvan bakım uygulamalarından farklı olarak **tam bir oyunlaştırma deneyimi** sunar. Kullanıcı, sanal bir pet'in bakımlarını üstlenirken oyun mekanikleriyle motive edilir ve her aksiyonu bir ilerleme hissine dönüştürür.

### 🐾 Pet Oluşturma & Kişiselleştirme
Kullanıcı uygulamaya başladığında kendi sanal evcil hayvanını yaratır:
- **İsim:** Pet'e özel bir isim verme (örn: "Nemo", "Pamuk", "Rocky")
- **Tür Seçimi:** Balık, kaplumbağa, kuş gibi farklı türler (şu an sadece balık aktif)
- **Habitat:** Mercan koyu, tatlısu akvaryumu, göl ortamı gibi yaşam alanları
- **Avatar:** Seçilen türe göre otomatik emoji/animasyon desteği

### 📊 Stat Döngüsü & Bakım Mekaniği
Her pet'in sürekli değişen 3 temel ihtiyacı vardır:
- **Tokluk (0-100%):** Pet'i beslemek artırır, zamanla azalır. Düşük tokluk → halsizlik
- **Mutluluk (0-100%):** Oynamak artırır. Yüksek mutluluk → bonus XP kazancı
- **Enerji (0-100%):** Dinlenmek artırır, aksiyonlar tüketir. Düşük enerji → aksiyon kısıtlaması

Bu üç stat birbirine bağlıdır: Mutlu bir pet daha hızlı enerji kazanır, tok bir pet daha iyi dinlenir.

### 🎯 Bakım Aksiyonları & XP Sistemi
Kullanıcı 3 temel bakım aksiyonu ile pet'ine etki eder:
- **🍕 Besle:** Tokluk +20, Enerji +5, XP +10
- **🎮 Oyna:** Mutluluk +25, Enerji -10, XP +15
- **😴 Dinlen:** Enerji +30, Tokluk -5, XP +5

Her aksiyon anında geri bildirim verir: XP artışı, stat değişimi, animasyon ve log kaydı.

### 🏆 Seviye & Rozet Sistemi
- **XP Birikimi:** Her aksiyon XP kazandırır, 100 XP'de seviye atlanır
- **Rozetler/Başarımlar:** "İlk Bakım", "Mutluluk Patlaması", "Rutin Ustası" gibi özel başarımlar
- **Günlük Seri:** Her gün giriş yapıldığında seri sayacı artar, bonus XP verir
- **Seviye İlerlemesi:** Görsel progress bar ile anlık takip

### 📝 Anlık Pet Günlüğü
Tüm aksiyonlar kronolojik olarak kaydedilir:
- "Günün mini görevi tamamlandı! +20 XP"
- "Oyun oynandı! +10 XP"
- Zaman damgası ile akış takibi

Bu sayede kullanıcı kendi bakım rutinini gözlemleyebilir ve geliştirebilir.

## Ekran Görüntüleri

| Rozetler ve Seviye | Profil | Bakım Ekranı | Giriş |
|:---:|:---:|:---:|:---:|
| ![Rozetler](./screenshots/01_rozetler.jpeg) | ![Profil](./screenshots/02_profil.jpeg) | ![Bakim](./screenshots/03_bakim.jpeg) | ![Giris](./screenshots/06_giris.jpeg) |

| Rozet Örnekleri | Bakım Akışı |
|:---:|:---:|
| ![Rozet Ornek](./screenshots/04_rozet_ornekleri.jpeg) | ![Bakim Akis](./screenshots/05_bakim_akis.jpeg) |

## Kurulum & Çalıştırma (Web)

### Gereksinimler

- Node.js (öneri: LTS)
- npm

### Adımlar

```bash
# repo kökünde
npm install
npm run dev
```

Ardından tarayıcıda Vite’ın verdiği adrese gidin (genelde `http://localhost:5173`).

## Kurulum & Çalıştırma (Mobil / Expo Go)

### Gereksinimler

- Node.js (öneri: LTS)
- Telefonunuzda **Expo Go**

### Adımlar

```bash
cd mobile
npm install
npx expo start -c
```

- Expo Go → **Scan QR code** ile QR’ı okutun.
- `-c` cache temizler; “eski hata / eski bundle” problemlerini azaltır.


> Not: Build süreci bulut üzerinde (EAS) gerçekleştiği için Expo Go yapısını kesinlikle bozmaz.
  - `https://youtube.com/shorts/jJhYUX9H1Sw?si=_ZWl9yp7gcOpQ1NM`

## Proje Yapısı

- **Web uygulaması**: `src/`
- **Mobil uygulama (Expo)**: `mobile/`


## Scripts

### Web

- `npm run dev`: geliştirme
- `npm run build`: production build
- `npm run preview`: build önizleme

### Mobil

- `cd mobile && npx expo start`: Expo dev server
- `cd mobile && npx expo start -c`: cache temizleyerek başlat

> 📄 Kullanıcı geri bildirim raporu: `docs/Kullanici_Geri_Bildirim_Raporu.md`

> ⚠️ **APK Durumu:** Expo prebuild yapıldı ancak Gradle build sırasında NDK/React Native Worklets uyumsuzluğu nedeniyle APK oluşturulamadı. Çözüm için Java 17 ve newArchEnabled ayarları yapıldı, build devam ediyor.

