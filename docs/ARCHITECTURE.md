# Jaza — Mimari ve Teknoloji Kararları

CLAUDE.md'deki önerilen stack büyük ölçüde onaylandı, birkaç netleştirme ile:

## Monorepo

pnpm workspaces, tek repo:

```
apps/
  mobile/    Expo (React Native + TypeScript) — üye uygulaması
  admin/     Next.js (TypeScript) — admin/personel paneli
packages/
  api/       Node.js + TypeScript + Express + Prisma — tek backend, hem mobile hem admin bunu kullanır
  shared/    Tasarım token'ları (theme/tokens.ts) + paylaşılan TS tipleri
design/      Referans HTML mockup'ları (statik, değişmeden korunuyor)
```

Tek backend + tek Postgres, iki client (mobile, admin) — CLAUDE.md'nin önerisiyle
aynı. Ayrı bir BFF katmanına şu aşamada gerek yok; admin'in ekstra ihtiyaçları
(rezervasyon onayları, doluluk override) aynı Express API üzerinde ayrı route'lar
olarak eklenecek.

## Backend

- **Express** (Fastify yerine) — ekosistem daha büyük, öğrenme eğrisi düşük,
  bu ölçekte performans farkı önemsiz.
- **Prisma + PostgreSQL** — CLAUDE.md önerisiyle aynı. İlişkisel model
  (User → Membership → Reservation → Guest, ForumPost, Record, Event) foreign
  key bütünlüğünden faydalanıyor. Şema: `packages/api/prisma/schema.prisma`.
- **Kimlik doğrulama**: e-posta + şifre (bcrypt hash) + JWT — CLAUDE.md
  önerisiyle aynı. Telefon alanı şimdilik opsiyonel (OTP akışı ikinci fazda
  eklenebilir).
- **QR kod**: `qrcode` paketi ile üretim, referans kodu (`Reservation.referenceCode`)
  üzerinden. Kapıdaki okutucu `POST /checkin/:ref` endpoint'ine istek atar
  (henüz stub, MVP adım 3-4'te eklenecek).
- **Gerçek zamanlı** (canlı doluluk, "şu an çalıyor"): Socket.IO öneriliyor —
  Supabase Realtime yerine, çünkü Postgres'i Supabase'e bağımlı kılmadan,
  kendi barındırdığımız Express sürecinde pub/sub yapabiliyoruz. Bu, MVP adım
  2'de (ana sayfa canlı doluluk) eklenecek; henüz kurulmadı.

## Mobil (üye uygulaması)

- **Expo (React Native + TypeScript)**, **expo-router** ile dosya tabanlı
  yönlendirme — CLAUDE.md önerisiyle aynı, expo-router eklenmesi ekip
  tercihi (React Navigation'ı manuel kurmaktan daha az boilerplate).
- Tasarım token'ları `@jaza/shared`'dan import edilir; renk/font/radius
  değerleri mockup'lardaki CSS custom property'lerinden birebir alındı
  (bkz. `packages/shared/src/theme/tokens.ts`).
- Fraunces + Inter + IBM Plex Mono fontları `expo-font` ile yüklenir.

## Admin paneli

- **Next.js (TypeScript, App Router)** — CLAUDE.md önerisiyle aynı. Bu adımda
  sadece iskelet kuruldu (paket yapılandırması + tema); rezervasyon/doluluk
  ekranları MVP adım 5'te inşa edilecek.

## Veritabanı şeması

Taslak şema `packages/api/prisma/schema.prisma` içinde. Kilit noktalar:

- `User.fullName` her zaman admin/ödeme tarafında görünür; `User.codeName`
  yalnızca forum/topluluk ekranlarında kullanılır (iş kuralı #6).
- `Membership` ayrı bir tablo (User üzerinde alan değil) — tier geçmişi ve
  yenileme kaydı tutulabilsin diye.
- `Reservation.type` ile Demo Odası / Cafe / Hi-Fi danışmanlık tek tabloda;
  Cafe girişleri `startAt == createdAt` ile "anlık" olarak modelleniyor
  (iş kuralı #4), Demo Odası ise `status: CONFIRMED` ile oluşturulup admin
  onayı beklemiyor (iş kuralı #2).
- `Guest` ayrı tablo, her rezervasyona bağlı (iş kuralı #3) — misafir sayısı
  limiti (Demo Odası: +3, Cafe: +5) uygulama katmanında (`packages/api`)
  doğrulanıyor, şemada değil.
- `CheckIn` tablosu QR okutucudan gelen her giriş/çıkış olayını ayrı satır
  olarak tutar — canlı doluluk buradan hesaplanır, `Reservation.status`
  sadece rezervasyonun kendi durumunu taşır.
- `NowPlaying.accentColor` albüm kapağından çıkarılan dominant renk — MVP'de
  admin manuel giriyor; ileride bir image-processing adımıyla otomatikleştirilebilir
  (iş kuralı #7).
- `LentRecord`, katalogdaki `Record`'dan ayrı: bağışlanan her fiziksel kopyayı
  (`donorId`, `status`, `borrowerId`) temsil eder — "askıda plak" (ikinci faz).

## MVP sırası — bu oturumda yapılan

Bu ilk adımda CLAUDE.md'nin "İlk adım" bölümündeki 4 madde tamamlandı:
tasarım token'ları çıkarıldı, stack teyit edildi, şema taslağı çıkarıldı,
ve MVP #1 (üyelik kaydı) ekranı kuruldu. Sonraki adımlar CLAUDE.md'deki
MVP sırasını takip etmeli: ana sayfa → Demo Odası rezervasyonu + QR →
Cafe anlık giriş + QR → admin paneli → plak kütüphanesi → forum/etkinlik/ikinci faz.
