# SWM Monorepo

## Prerequisites
- Node.js 18+
- NPM (or PNPM)
- SQLite (bundled with Prisma)

## Quick Start

### 1) Backend Setup

```bash
cd swm/backend
```

Create a `.env` file in the `backend` directory with the following:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=4000
CORS_ORIGIN="http://localhost:3000"
NODE_ENV=development
```

Then run:

```bash
npm install
npm run prisma:gen
npm run prisma:migrate
npm run dev
```

The API will run at http://localhost:4000

**Optional:** Create seed data (admin user, bins, rewards):
- Create `src/seed.ts` (see example below)
- Set `ADMIN_DEFAULT_EMAIL` and `ADMIN_DEFAULT_PASSWORD` in `.env`
- Run `npm run prisma:seed`

### 2) Frontend Setup

Open a new terminal:

```bash
cd swm/frontend
```

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

Then run:

```bash
npm install
npm run dev
```

The frontend will run at http://localhost:3000

## 3) Test flow
- Register a user at /register
- Login at /login (token stored in localStorage)
- Redeem a code at /redeem (create a code via backend /iot/operation)
- View wallet /wallet
- See bins /bins
- Admin dashboard /admin/dashboard (requires an admin token)

## Seed example (backend/src/seed.ts)
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './auth';
const prisma = new PrismaClient();
async function main() {
  const adminPw = await hashPassword(process.env.ADMIN_DEFAULT_PASSWORD!);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_DEFAULT_EMAIL! },
    update: {},
    create: { name: 'Admin', email: process.env.ADMIN_DEFAULT_EMAIL!, role: 'admin', passwordHash: adminPw }
  });

  const bin = await prisma.bin.upsert({
    where: { binId: 'BIN01' },
    update: {},
    create: { binId: 'BIN01', lat: 30.175, lng: 31.505, apiKey: 'BIN01_SECRET', status: 'Available' }
  });

  await prisma.reward.create({ data: { title: '10% Store Discount', pointsRequired: 100, availability: 50 } });

  console.log({ admin, bin });
}
main().finally(() => prisma.$disconnect());

## Create a code (simulate IoT)
curl -X POST http://localhost:4000/iot/operation \
  -H "Content-Type: application/json" \
  -d '{"binId":"BIN01","weight":2.5,"timestamp":"2025-01-01T10:00:00Z","apiKey":"BIN01_SECRET","nonce":"abc123","signature":"<hmac_here>"}'

# HMAC = hex( HMAC_SHA256(apiKey, "BIN01|2.5|2025-01-01T10:00:00Z|abc123") )

## Redeem (after login, use Bearer token)
curl -X POST http://localhost:4000/redeem \
  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  -d '{"code":"BIN01-<generated>-<rand>"}'