# Smart Waste Management System - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technologies Used](#technologies-used)
4. [Backend Documentation](#backend-documentation)
5. [Frontend Documentation](#frontend-documentation)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Security Features](#security-features)
9. [How It Works](#how-it-works)
10. [Setup Instructions](#setup-instructions)

---

## Project Overview

**Smart Waste Management (SWM)** is a full-stack web application designed to incentivize waste recycling through a points-based reward system. Users can deposit waste into smart bins, receive redeemable codes, and earn points that can be exchanged for rewards.

### Key Features
- **User Authentication**: Registration and login system with JWT tokens
- **Smart Bin Integration**: IoT devices can report waste deposits via secure API
- **Code Redemption**: Users redeem codes from waste deposits to earn points
- **Points Wallet**: Track points balance and transaction history
- **Rewards System**: Browse available rewards and their point requirements
- **Bin Management**: View all smart bins with location and status information
- **Admin Dashboard**: Administrative interface for managing bins and viewing system metrics

---

## Architecture

The project follows a **monorepo structure** with separate backend and frontend applications:

```
swm/
├── backend/          # Express.js API server
│   ├── src/         # TypeScript source files
│   ├── prisma/      # Database schema and migrations
│   └── dist/        # Compiled JavaScript output
└── frontend/        # Next.js web application
    └── app/         # Next.js App Router pages
```

### Communication Flow
1. **Frontend** (Next.js) → HTTP requests → **Backend** (Express.js)
2. **Backend** → Prisma ORM → **SQLite Database**
3. **IoT Devices** → Secure API → **Backend** → Generate redemption codes
4. **Users** → Frontend → Redeem codes → **Backend** → Award points

---

## Technologies Used

### Backend Technologies

#### **Runtime & Framework**
- **Node.js**: JavaScript runtime environment
- **Express.js** (`^4.19.2`): Web application framework for building REST APIs
- **TypeScript** (`^5.6.3`): Type-safe JavaScript with static typing

#### **Database & ORM**
- **Prisma** (`^5.6.0`): Modern ORM (Object-Relational Mapping) tool
- **SQLite**: Lightweight, file-based relational database
- **@prisma/client** (`^5.6.0`): Prisma's database client for TypeScript

#### **Authentication & Security**
- **jsonwebtoken** (`^9.0.2`): JWT (JSON Web Token) implementation for authentication
- **argon2** (`^0.31.0`): Secure password hashing algorithm (winner of Password Hashing Competition)
- **helmet** (`^7.0.0`): Security middleware that sets various HTTP headers
- **cors** (`^2.8.5`): Cross-Origin Resource Sharing middleware
- **express-rate-limit** (`^7.1.5`): Rate limiting middleware to prevent abuse

#### **Validation & Utilities**
- **zod** (`^3.23.8`): TypeScript-first schema validation library
- **dotenv** (`^16.4.0`): Loads environment variables from `.env` file
- **crypto** (Node.js built-in): Cryptographic functionality for HMAC signatures

#### **Development Tools**
- **tsx** (`^4.20.6`): TypeScript execution engine for development
- **ts-node** (`^10.9.2`): TypeScript execution environment
- **@types/***: TypeScript type definitions for various packages

### Frontend Technologies

#### **Framework & UI**
- **Next.js** (`14.2.5`): React framework with App Router for server-side rendering and routing
- **React** (`18.3.1`): JavaScript library for building user interfaces
- **React DOM** (`18.3.1`): React renderer for web browsers
- **TailwindCSS** (`^3.4.10`): Utility-first CSS framework for styling

#### **Build Tools**
- **TypeScript** (`5.9.3`): Type-safe JavaScript
- **PostCSS** (`^8.4.35`): CSS transformation tool
- **Autoprefixer** (`^10.4.20`): Automatically adds vendor prefixes to CSS

#### **Development Tools**
- **@types/node**, **@types/react**: TypeScript type definitions

---

## Backend Documentation

### Project Structure

```
backend/
├── src/
│   ├── server.ts          # Main Express application entry point
│   ├── config.ts          # Environment configuration management
│   ├── auth.ts            # Password hashing/verification utilities
│   ├── middleware.ts      # Authentication & authorization middleware
│   ├── prisma.ts          # Prisma client initialization
│   └── routes/
│       ├── auth.ts        # Authentication routes (login/register)
│       ├── user.ts        # User profile & wallet routes
│       ├── admin.ts       # Admin-only routes
│       ├── iot.ts         # IoT device integration routes
│       └── redeem.ts      # Code redemption routes
├── prisma/
│   ├── schema.prisma      # Database schema definition
│   └── migrations/        # Database migration files
└── dist/                  # Compiled JavaScript output
```

### Core Files Explained

#### **server.ts** - Main Application
- Initializes Express application
- Configures security middleware (Helmet, CORS, rate limiting)
- Sets up JSON body parsing
- Mounts all route handlers
- Starts HTTP server on configured port

**Key Features:**
- Rate limiting: 300 requests per 15 minutes
- CORS with configurable origins
- JSON payload limit: 1MB
- Health check endpoint at `/health`

#### **config.ts** - Environment Configuration
Manages environment variables:
- `JWT_SECRET`: Secret key for signing JWT tokens (required)
- `CORS_ORIGIN`: Allowed frontend origins (comma-separated)
- `PORT`: Server port (default: 4000)
- `NODE_ENV`: Environment mode (development/production)

#### **auth.ts** - Password Security
- `hashPassword()`: Uses Argon2 to hash passwords securely
- `verifyPassword()`: Verifies passwords against Argon2 hashes
- Argon2 is resistant to GPU cracking and timing attacks

#### **middleware.ts** - Request Authentication
- `authRequired`: Validates JWT token from `Authorization: Bearer <token>` header
- Extracts user ID and role from token payload
- `adminOnly`: Ensures user has `admin` role (used after `authRequired`)

#### **prisma.ts** - Database Client
- Initializes Prisma Client singleton
- Enables query logging in development mode
- Prevents multiple client instances in development

### Route Handlers

#### **auth.ts** - Authentication Routes

**POST `/auth/register`**
- Validates user input with Zod schema
- Checks for duplicate email addresses
- Hashes password with Argon2
- Creates new user with role `user` (default)
- Returns user ID on success

**POST `/auth/login`**
- Validates email and password
- Verifies password against stored hash
- Generates JWT token (2-hour expiration)
- Returns token and user basic info (id, name, role)

#### **user.ts** - User Routes

**GET `/me`** (Protected)
- Returns authenticated user's profile (id, name, email, role)

**GET `/wallet`** (Protected)
- Fetches all points transactions for authenticated user
- Calculates current balance by summing earn/spend transactions
- Returns balance and transaction history

**GET `/bins`** (Public)
- Returns list of all bins with location, status, and capacity info

**GET `/rewards`** (Public)
- Returns all available rewards with point requirements

#### **admin.ts** - Admin Routes

**GET `/admin/dashboard`** (Admin Only)
- Aggregates system metrics:
  - Total users count
  - Total operations count
  - Total bins count
  - Total points distributed

**POST `/admin/bins`** (Admin Only)
- Creates new smart bin
- Generates unique 64-character API key for IoT authentication
- Validates coordinates (latitude: -90 to 90, longitude: -180 to 180)
- Sets default status and recycling acceptance

**GET `/admin/operations`** (Admin Only)
- Returns all operations ordered by timestamp (newest first)

#### **iot.ts** - IoT Device Integration

**POST `/iot/operation`**
- **Purpose**: Secure endpoint for IoT devices to report waste deposits
- **Security Features**:
  - API key authentication (validates bin's API key)
  - HMAC-SHA256 signature verification
  - Timestamp validation (rejects requests >5 minutes old)
  - Nonce-based replay attack prevention
- **Process**:
  1. Validates payload structure with Zod
  2. Verifies bin exists and API key matches
  3. Checks timestamp is within 5-minute window
  4. Computes HMAC: `SHA256(binId|weight|timestamp|nonce)`
  5. Verifies signature using timing-safe comparison
  6. Checks nonce hasn't been used before
  7. Creates operation record with unique `codeId`
  8. Calculates points: `weight × 10` (rounded)
  9. Sets expiration: 24 hours from creation
  10. Updates bin capacity and last operation timestamp
- **Returns**: Redemption code (`codeId`) for user

#### **redeem.ts** - Code Redemption

**POST `/redeem`** (Protected)
- Validates redemption code format
- Checks code exists and status is `Unused`
- Verifies code hasn't expired (24-hour window)
- Uses database transaction to:
  1. Mark operation as `Used` and link to user
  2. Create points transaction (type: `earn`)
- Returns success message with points added

---

## Frontend Documentation

### Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Home page
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Registration page
│   ├── redeem/
│   │   └── page.tsx            # Code redemption page
│   ├── wallet/
│   │   └── page.tsx            # Points wallet page
│   ├── rewards/
│   │   └── page.tsx            # Rewards catalog page
│   ├── bins/
│   │   └── page.tsx            # Bins map/list page
│   └── admin/
│       └── dashboard/
│           └── page.tsx        # Admin dashboard
├── lib/
│   └── api.ts                  # API client utility
├── styles/
│   └── globals.css             # Global CSS styles
└── tailwind.config.js          # TailwindCSS configuration
```

### Core Files Explained

#### **layout.tsx** - Root Layout
- Wraps all pages with consistent HTML structure
- Provides global navigation header
- Links to all major pages (Home, Login, Register, Redeem, Wallet, Rewards, Bins, Admin)
- Applies TailwindCSS global styles
- Sets page metadata (title, description)

#### **lib/api.ts** - API Client
- Centralized API request handler
- Reads `NEXT_PUBLIC_API_URL` from environment (defaults to `http://localhost:4000`)
- Automatically attaches JWT token from `localStorage` to requests
- Sets `Content-Type: application/json` header
- Throws errors for failed requests
- Used by all pages for backend communication

### Pages Explained

#### **page.tsx** - Home Page
- Simple welcome page
- Displays project title and brief description
- No authentication required

#### **login/page.tsx** - Login Page
- **Client Component** (`'use client'`)
- Form with email and password fields
- On submit:
  1. Calls `/auth/login` endpoint
  2. Stores JWT token in `localStorage`
  3. Displays success message and token preview
- Uses React hooks (`useState`) for form state management

#### **register/page.tsx** - Registration Page
- **Client Component**
- Form with name, email, and password fields
- On submit:
  1. Calls `/auth/register` endpoint
  2. Shows success message prompting user to login
- Uses dynamic form rendering with array mapping

#### **redeem/page.tsx** - Code Redemption Page
- **Client Component**
- Single input field for redemption code
- Retrieves token from `localStorage`
- On submit:
  1. Calls `/redeem` endpoint with Bearer token
  2. Displays points added on success
- Shows error messages for invalid/expired codes

#### **wallet/page.tsx** - Points Wallet Page
- **Client Component**
- Fetches wallet data on component mount (`useEffect`)
- Displays:
  - Current points balance
  - Transaction history (type, points, date)
- Requires authentication (token in `localStorage`)

#### **rewards/page.tsx** - Rewards Catalog Page
- **Client Component**
- Fetches rewards list on mount
- Displays rewards in grid layout:
  - Title
  - Points required
  - Availability count
- Public page (no authentication required)

#### **bins/page.tsx** - Smart Bins Page
- **Client Component**
- Fetches bins list on mount
- Displays each bin with:
  - Bin ID
  - Coordinates (latitude, longitude)
  - Status (Available, PartiallyFull, Full, Offline)
  - Capacity used (kg)
  - Recycling acceptance status
- Public page (no authentication required)

#### **admin/dashboard/page.tsx** - Admin Dashboard
- **Client Component**
- Fetches dashboard metrics on mount
- Displays key metrics in grid:
  - Total users
  - Total operations
  - Total bins
  - Points distributed
- Requires admin authentication
- Shows error message if unauthorized

### Styling

- **TailwindCSS**: Utility-first CSS framework
- **Global Styles**: Applied via `globals.css` imported in layout
- **Responsive Design**: Uses Tailwind's responsive utilities (`md:grid-cols-2`)
- **Color Scheme**: Blue for primary actions, green for success actions

---

## Database Schema

The database uses **SQLite** with **Prisma ORM**. Below is the complete schema:

### Models

#### **User**
Stores user account information.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Unique identifier |
| `name` | String | User's full name |
| `email` | String (Unique) | User's email address |
| `phone` | String? | Optional phone number |
| `location` | String? | Optional location |
| `role` | String | User role (`user` or `admin`, default: `user`) |
| `passwordHash` | String | Argon2 hashed password |
| `createdAt` | DateTime | Account creation timestamp |
| `operations` | Operation[] | Related operations (when user redeems codes) |
| `transactions` | PointsTransaction[] | Points transaction history |

#### **Bin**
Represents a smart waste bin in the system.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Unique identifier |
| `binId` | String (Unique) | Human-readable bin identifier |
| `lat` | Float | Latitude coordinate (-90 to 90) |
| `lng` | Float | Longitude coordinate (-180 to 180) |
| `status` | String | Status: `Available`, `PartiallyFull`, `Full`, `Offline` |
| `capacityUsed` | Float | Current capacity used (kg, default: 0) |
| `acceptsRecycling` | Boolean | Whether bin accepts recyclables (default: true) |
| `lastOperationAt` | DateTime? | Timestamp of last waste deposit |
| `apiKey` | String | Secret key for IoT device authentication |
| `operations` | Operation[] | All operations from this bin |

#### **Operation**
Represents a waste deposit operation that generates a redemption code.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Unique identifier |
| `codeId` | String (Unique) | Redemption code for users |
| `binId` | String | Foreign key to Bin |
| `bin` | Bin | Related bin object |
| `weight` | Float | Weight of waste deposited (kg) |
| `timestamp` | DateTime | When deposit occurred |
| `points` | Int | Points awarded (calculated: weight × 10) |
| `status` | String | `Unused` or `Used` (default: `Unused`) |
| `redeemedByUserId` | String? | Foreign key to User (who redeemed) |
| `redeemedBy` | User? | Related user object |
| `expiresAt` | DateTime? | Code expiration (24 hours from creation) |
| `hmac` | String (Unique) | HMAC signature for verification |
| `nonce` | String (Unique) | One-time use value for replay prevention |

#### **PointsTransaction**
Tracks all points earned and spent by users.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Unique identifier |
| `userId` | String | Foreign key to User |
| `user` | User | Related user object |
| `operationId` | String | Foreign key to Operation (if from redemption) |
| `points` | Int | Points amount (positive for earn, negative for spend) |
| `type` | String | Transaction type (`earn` or `spend`) |
| `createdAt` | DateTime | Transaction timestamp |

#### **Reward**
Defines available rewards users can redeem with points.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (CUID) | Unique identifier |
| `title` | String | Reward name/description |
| `pointsRequired` | Int | Points needed to redeem |
| `availability` | Int | Number available (default: 0) |
| `metadata` | String? | Additional JSON data |
| `createdAt` | DateTime | Creation timestamp |

### Relationships

- **User** ↔ **Operation**: One-to-many (user can redeem multiple operations)
- **User** ↔ **PointsTransaction**: One-to-many (user has many transactions)
- **Bin** ↔ **Operation**: One-to-many (bin generates many operations)
- **Operation** ↔ **PointsTransaction**: One-to-one (each redemption creates one transaction)

---

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information and available endpoints |
| GET | `/health` | Health check endpoint |
| POST | `/auth/register` | Register new user account |
| POST | `/auth/login` | Login and receive JWT token |
| GET | `/bins` | Get list of all bins |
| GET | `/rewards` | Get list of all rewards |
| POST | `/iot/operation` | IoT device reports waste deposit |

### Protected Endpoints (Require JWT Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Get authenticated user's profile |
| GET | `/wallet` | Get user's points balance and transactions |
| POST | `/redeem` | Redeem a code to earn points |

### Admin Endpoints (Require Admin Role)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Get system metrics |
| POST | `/admin/bins` | Create new smart bin |
| GET | `/admin/operations` | Get all operations |

### Request/Response Examples

#### **POST /auth/login**
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123...",
    "name": "John Doe",
    "role": "user"
  }
}
```

#### **POST /iot/operation**
```json
Request:
{
  "binId": "BIN01",
  "weight": 2.5,
  "timestamp": "2025-01-15T10:30:00Z",
  "apiKey": "bin_api_key_here",
  "nonce": "unique-nonce-12345",
  "signature": "hmac_sha256_hex_signature"
}

Response:
{
  "code": "clx456-abc123-def456"
}
```

#### **POST /redeem**
```json
Request:
{
  "code": "clx456-abc123-def456"
}

Response:
{
  "success": true,
  "pointsAdded": 25
}
```

---

## Security Features

### Authentication & Authorization
1. **JWT Tokens**: Stateless authentication with 2-hour expiration
2. **Password Hashing**: Argon2 algorithm (resistant to GPU attacks)
3. **Role-Based Access**: Admin-only routes protected by middleware
4. **Token Storage**: Frontend stores tokens in `localStorage`

### API Security
1. **Helmet**: Sets security HTTP headers (XSS protection, content type sniffing prevention)
2. **CORS**: Configurable origin whitelist prevents unauthorized domains
3. **Rate Limiting**: 300 requests per 15 minutes per IP
4. **Input Validation**: Zod schemas validate all request payloads
5. **JSON Size Limit**: 1MB maximum payload size

### IoT Device Security
1. **API Key Authentication**: Each bin has unique 64-character API key
2. **HMAC Signatures**: SHA-256 HMAC verification prevents tampering
3. **Timestamp Validation**: Rejects requests >5 minutes old
4. **Nonce Replay Prevention**: Each operation uses unique nonce (stored in DB)
5. **Timing-Safe Comparison**: Prevents timing attacks on signature verification

### Code Redemption Security
1. **One-Time Use**: Codes can only be redeemed once
2. **Expiration**: Codes expire 24 hours after creation
3. **Status Validation**: Only `Unused` codes can be redeemed
4. **Database Transactions**: Atomic updates prevent race conditions

---

## How It Works

### User Flow

1. **Registration**
   - User creates account at `/register`
   - Backend hashes password with Argon2
   - User record created in database

2. **Login**
   - User logs in at `/login`
   - Backend verifies password
   - JWT token generated and stored in browser

3. **Waste Deposit (IoT)**
   - IoT device detects waste deposit
   - Device generates nonce and computes HMAC signature
   - Device sends operation to `/iot/operation`
   - Backend validates and creates operation record
   - Backend generates unique redemption code
   - Code returned to device (displayed to user)

4. **Code Redemption**
   - User enters code at `/redeem` page
   - Frontend sends code with JWT token
   - Backend validates code (exists, unused, not expired)
   - Points transaction created
   - Operation marked as `Used`

5. **Points Management**
   - User views balance at `/wallet`
   - All transactions displayed with history
   - Balance calculated from transaction sum

6. **Rewards**
   - User browses rewards at `/rewards`
   - Sees point requirements and availability
   - (Future: Redeem rewards with points)

### Admin Flow

1. **Dashboard Access**
   - Admin logs in (same as user)
   - Accesses `/admin/dashboard`
   - Views system metrics

2. **Bin Management**
   - Admin creates new bins via `/admin/bins`
   - System generates API key for IoT device
   - Bin appears on `/bins` page

3. **Operations Monitoring**
   - Admin views all operations at `/admin/operations`
   - Can track system usage and activity

### IoT Device Flow

1. **Initialization**
   - Admin creates bin in system
   - API key generated and provided to device manufacturer

2. **Waste Detection**
   - Device detects weight change
   - Generates unique nonce
   - Creates timestamp (ISO 8601 format)
   - Computes HMAC: `SHA256(binId|weight|timestamp|nonce)`

3. **Operation Submission**
   - Device sends POST request to `/iot/operation`
   - Includes all required fields and signature
   - Receives redemption code
   - Displays code to user (via screen/QR code)

---

## Setup Instructions

### Prerequisites
- **Node.js** 18 or higher
- **NPM** (comes with Node.js)
- **SQLite** (bundled with Prisma, no separate installation needed)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd swm/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create `.env` file in `backend/` directory:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   PORT=4000
   CORS_ORIGIN="http://localhost:3000"
   NODE_ENV=development
   ```

4. **Generate Prisma Client**
   ```bash
   npm run prisma:gen
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```
   Backend will run at `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd swm/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create `.env.local` file in `frontend/` directory:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:4000"
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend will run at `http://localhost:3000`

### Testing the System

1. **Register a user**
   - Go to `http://localhost:3000/register`
   - Fill in name, email, password
   - Submit form

2. **Login**
   - Go to `http://localhost:3000/login`
   - Enter credentials
   - Token stored in browser

3. **Create a bin (Admin)**
   - Create admin user manually in database or use seed script
   - Login as admin
   - Use API or create bin via admin interface

4. **Simulate IoT operation**
   - Use curl or Postman to send POST to `/iot/operation`
   - Include valid API key and HMAC signature
   - Receive redemption code

5. **Redeem code**
   - Go to `http://localhost:3000/redeem`
   - Enter code from step 4
   - Points added to wallet

6. **View wallet**
   - Go to `http://localhost:3000/wallet`
   - See balance and transaction history

### Production Build

**Backend:**
```bash
cd swm/backend
npm run build
npm start
```

**Frontend:**
```bash
cd swm/frontend
npm run build
npm start
```

---

## Additional Notes

### Environment Variables

**Backend (.env)**
- `DATABASE_URL`: Prisma database connection string
- `JWT_SECRET`: Secret key for signing JWT tokens (use strong random string)
- `PORT`: Server port number
- `CORS_ORIGIN`: Allowed frontend origins (comma-separated)
- `NODE_ENV`: Environment mode (`development` or `production`)

**Frontend (.env.local)**
- `NEXT_PUBLIC_API_URL`: Backend API base URL

### Development Scripts

**Backend:**
- `npm run dev`: Start development server with hot reload (tsx watch)
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run compiled JavaScript
- `npm run prisma:gen`: Generate Prisma Client
- `npm run prisma:migrate`: Run database migrations

**Frontend:**
- `npm run dev`: Start Next.js development server
- `npm run build`: Build production bundle
- `npm start`: Start production server

### Database Migrations

When schema changes are made:
1. Update `prisma/schema.prisma`
2. Run `npm run prisma:migrate -- --name migration_name`
3. Prisma Client auto-regenerates

### Future Enhancements

Potential improvements:
- Reward redemption functionality
- Email notifications
- QR code generation for redemption codes
- Interactive map for bin locations
- User profile editing
- Password reset functionality
- Points spending transactions
- Reward availability management

---

## Conclusion

This Smart Waste Management system demonstrates a complete full-stack application with:
- Secure authentication and authorization
- IoT device integration with cryptographic security
- Points-based reward system
- Admin dashboard for system management
- Modern tech stack (Next.js, Express, Prisma, TypeScript)
- Production-ready security features

The system is designed to be scalable, secure, and maintainable, following best practices for web development and API security.

