# Jaza — Culture, Music & Cafe

Üyelik tabanlı kafe/topluluk mekanı için üye mobil uygulaması, admin paneli ve backend.

## Yapı

```
apps/
  mobile/    Expo (React Native + TypeScript) — üye uygulaması
  admin/     Next.js (TypeScript) — admin/personel paneli
packages/
  api/       Node.js + Express + Prisma — backend
  shared/    Tasarım token'ları + paylaşılan TypeScript tipleri
design/      Referans HTML mockup'ları (tasarım kaynağı, statik)
docs/        Mimari notları
```

Mimari kararlar ve gerekçeleri için bkz. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Geliştirme

```bash
pnpm install

# backend (Postgres bağlantısı için packages/api/.env.example'ı kopyalayın)
pnpm --filter @jaza/api prisma:generate
pnpm dev:api

# mobil app
pnpm dev:mobile

# admin panel
pnpm dev:admin
```
