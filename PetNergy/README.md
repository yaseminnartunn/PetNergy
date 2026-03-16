# PetNergy 🐾⚡

PetNergy, **evcil hayvan bakımı + oyunlaştırma** fikrini tek bir akışta birleştiren, web ve mobil (Expo) olarak çalışan bir projedir.

- **Web**: Vite + React (UI odaklı, localStorage ile demo veri akışı)
- **Mobil**: Expo SDK 54 + React Native (Expo Go ile çalışır)

## Amaç

Kullanıcıya “bakım” aksiyonlarını (besle/oyna/dinlen) yaptırırken; XP, bonus XP, mini görev ve ödül/rozet hissiyle **oyunlaştırılmış bir deneyim** sunmak.

## Oyunlaştırma özellikleri

- **Pet oluşturma**: İsim, tür, habitat
- **Stat döngüsü**: Tokluk / Mutluluk / Enerji
- **Bakım aksiyonları**: Besle, Oyna, Dinlen → stat + XP etkileri
- **Mini görev**: Mutluluk %85 üstüne çıkınca bonus XP kazanma
- **Ödüller ekranı**: Seviye ilerleme kartı + rozet/başarım kartları (UI)
- **Anlık pet günlüğü**: Son aksiyonlar ve mini log akışı (mobil)

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

## APK (indirilebilir)

- APK dosyası repo içinde şu konumda paylaşılacaktır:
  - `APK/PetNergy.apk`

> Not: Şu an repoda APK dosyası yok. `APK/` klasörüne ekleyip yukarıdaki yolu güncelleyebilirsin.

## 1 Dakikalık Tanıtım Videosu (YouTube)

- Tanıtım videosu linki:
  - `https://youtube.com/` **(buraya kendi videonun linkini yapıştır)**

## Proje Yapısı

- **Web uygulaması**: `src/`
- **Mobil uygulama (Expo)**: `mobile/`
- **APK çıktısı (repo içinde)**: `APK/`

## Scripts

### Web

- `npm run dev`: geliştirme
- `npm run build`: production build
- `npm run preview`: build önizleme

### Mobil

- `cd mobile && npx expo start`: Expo dev server
- `cd mobile && npx expo start -c`: cache temizleyerek başlat

