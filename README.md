<div align="center">

# 🛠️ GearGuard - The Ultimate Maintenance Tracker

### *Enterprise-grade equipment maintenance management system that transforms chaos into control*

[![Demo](https://img.shields.io/badge/🎥_Watch-Demo_Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PM2](https://img.shields.io/badge/PM2-Latest-2B037A?style=for-the-badge&logo=pm2&logoColor=white)](https://pm2.keymetrics.io/)

---

**GearGuard transforms complex equipment maintenance workflows into streamlined, automated processes—empowering teams to prevent downtime, track assets in real-time, and maintain operational excellence.**

</div>

## 🎯 Key Features

<div align="center">

| 📊 **Dashboard Analytics** | 🔧 **Equipment Management** | 📋 **Request Workflow** | 👥 **Team Collaboration** |
|:---------------------------|:---------------------------|:------------------------|:--------------------------|
| Real-time metrics | Asset lifecycle tracking | Automated routing | Role-based access |
| Performance insights | Maintenance schedules | Status workflows | Team assignments |
| Trend analysis | QR code integration | Priority management | Activity feeds |

</div>

### Complete Feature Set

#### 📊 Dashboard & Analytics
- 🎯 **Real-time Metrics Dashboard** - Live overview of equipment status, pending requests, and team workload
- 📈 **Performance Analytics** - Track maintenance trends, response times, and equipment uptime
- 🔔 **Smart Notifications** - Automated alerts for overdue maintenance, high-priority requests, and team updates
- 📉 **Predictive Insights** - AI-powered maintenance forecasting based on historical data
- 📑 **Custom Reports** - Generate detailed reports filtered by date, department, equipment, or team
- 🎨 **Interactive Visualizations** - Graphs, charts, and heatmaps for data-driven decision making

#### 🔧 Equipment Management
- 📦 **Complete Asset Registry** - Centralized database of all equipment with detailed specifications
- 🏷️ **QR Code Integration** - Scan-to-access equipment details and maintenance history
- 📅 **Maintenance Scheduling** - Automated preventive maintenance calendar with reminders
- 📝 **Comprehensive History** - Full audit trail of repairs, updates, and service records
- 💰 **Cost Tracking** - Monitor maintenance expenses and calculate total cost of ownership
- 🔍 **Advanced Search & Filter** - Find equipment by status, location, department, or custom tags

#### 📋 Maintenance Request System
- ⚡ **Quick Request Creation** - Submit maintenance requests in seconds with photo attachments
- 🔄 **Smart Workflow Engine** - Automatic routing to appropriate teams based on equipment type and priority
- 🎯 **Priority Management** - URGENT, HIGH, MEDIUM, LOW priority levels with SLA tracking
- 📊 **Kanban Board View** - Visual workflow management with drag-and-drop status updates
- 📅 **Calendar Integration** - Schedule maintenance windows and track deadlines
- ✅ **Completion Tracking** - Detailed resolution notes, before/after photos, and work logs

#### 👥 Team & Department Management
- 🏢 **Department Organization** - Structure teams by departments with custom hierarchies
- 👤 **Role-Based Access Control** - ADMIN, MANAGER, TECHNICIAN, and USER roles with granular permissions
- 📊 **Workload Balancing** - Distribute requests evenly across team members
- 🎖️ **Skill Tracking** - Match technicians to requests based on expertise and certifications
- 💬 **Team Collaboration** - Internal comments, notes, and status updates
- 📈 **Performance Metrics** - Track individual and team KPIs, response times, and resolution rates

#### 🔐 Security & Authentication
- 🔑 **JWT-Based Authentication** - Secure token-based user sessions with automatic refresh
- 🔒 **Encrypted Password Storage** - Industry-standard bcrypt hashing
- 🛡️ **Role-Based Authorization** - Middleware-enforced permissions at every API endpoint
- 🔐 **Team Access Control** - Restrict data access to assigned teams and departments
- 📝 **Audit Logging** - Complete activity history for compliance and security monitoring

#### 🚀 Developer Experience
- 📘 **RESTful API Design** - Clean, consistent API with comprehensive documentation
- 🔄 **Real-time Updates** - WebSocket support for live notifications and status changes
- 🧪 **Full Test Coverage** - E2E and unit tests for critical workflows
- 📚 **Postman Collection** - Ready-to-use API testing suite included
- 🔧 **Easy Configuration** - Environment-based settings for seamless deployment
- 🐳 **Docker Ready** - Containerized deployment for production environments
- ⚙️ **PM2 Process Management** - Zero-downtime deployments with automatic restarts and monitoring

---

## 🏗️ Architecture Overview

<div align="center">

```mermaid
graph LR
    subgraph Frontend["🎨 FRONTEND LAYER"]
        A[React + TypeScript]
        B[Vite]
        C[TailwindCSS]
        D[Zustand]
        E[React Router]
    end
    
    subgraph Backend["🔙 BACKEND LAYER"]
        F[Express.js API]
        G[JWT Auth]
        H[Middleware]
        I[Controllers]
        J[Services]
    end
    
    subgraph Database["💾 DATA LAYER"]
        K[PostgreSQL]
        L[Prisma ORM]
        M[Migrations]
    end
    
    Frontend -->|REST API| Backend
    Backend -->|SQL Queries| Database
    
    style Frontend fill:#61DAFB,stroke:#0284c7,stroke-width:3px
    style Backend fill:#68A063,stroke:#15803d,stroke-width:3px
    style Database fill:#336791,stroke:#1e40af,stroke-width:3px
```

**Architecture Flow:**
- **Frontend Layer**: React 19.2 with TypeScript, Vite build tool, TailwindCSS for styling, Zustand for state management
- **Backend Layer**: Express.js REST API with JWT authentication, middleware protection, and service-oriented architecture  
- **Data Layer**: PostgreSQL database with Prisma ORM for type-safe database access and automated migrations

</div>

---

## 📁 Project Structure

```
gearguard/
│
├── 📄 README.md                        # You are here!
├── 📜 LICENSE                          # MIT License
│
├── 🔙 backend/                         # Node.js + Express API
│   ├── 📦 package.json                 # Backend dependencies
│   ├── ⚙️ tsconfig.json                # TypeScript configuration
│   ├── 🔧 nodemon.json                 # Dev server config
│   ├── 📚 API_TESTING.md               # API testing guide
│   ├── 🎯 QUICK_REFERENCE.md           # Quick command reference
│   │
│   ├── 🗄️ prisma/                      # Database layer
│   │   ├── 📋 schema.prisma            # Database schema definition
│   │   ├── 🌱 seed.ts                  # Database seeding script
│   │   └── 📂 migrations/              # Database version control
│   │
│   └── 💻 src/                         # Source code
│       ├── 🚀 server.ts                # Application entry point
│       │
│       ├── ⚙️ config/                  # Configuration files
│       │   ├── database.ts             # Prisma client setup
│       │   └── index.ts                # Environment variables
│       │
│       ├── 🎮 controllers/             # Request handlers
│       │   ├── authController.ts       # Authentication endpoints
│       │   ├── equipmentController.ts  # Equipment CRUD
│       │   ├── requestController.ts    # Maintenance requests
│       │   ├── departmentController.ts # Department management
│       │   └── teamController.ts       # Team operations
│       │
│       ├── 🛡️ middleware/              # Express middleware
│       │   ├── auth.ts                 # JWT verification
│       │   ├── teamAuth.ts             # Team-based access control
│       │   └── errorHandler.ts         # Global error handling
│       │
│       ├── 🛣️ routes/                  # API route definitions
│       │   ├── index.ts                # Route aggregator
│       │   ├── authRoutes.ts           # /api/auth/*
│       │   ├── equipmentRoutes.ts      # /api/equipment/*
│       │   ├── requestRoutes.ts        # /api/requests/*
│       │   ├── departmentRoutes.ts     # /api/departments/*
│       │   └── teamRoutes.ts           # /api/teams/*
│       │
│       ├── 🏢 services/                # Business logic layer
│       │   ├── authService.ts          # User authentication
│       │   ├── equipmentService.ts     # Equipment operations
│       │   ├── requestService.ts       # Request workflows
│       │   ├── departmentService.ts    # Department logic
│       │   └── teamService.ts          # Team management
│       │
│       └── 🔧 utils/                   # Helper functions
│           ├── jwt.ts                  # Token generation/validation
│           └── password.ts             # Password hashing
│
├── 🎨 frontend/                        # React + TypeScript UI
│   ├── 📦 package.json                 # Frontend dependencies
│   ├── ⚙️ vite.config.ts               # Vite build configuration
│   ├── 🎨 tailwind.config.js           # Tailwind CSS setup
│   ├── 📝 tsconfig.json                # TypeScript config
│   ├── 🧹 eslint.config.js             # Code quality rules
│   ├── 📄 index.html                   # HTML entry point
│   │
│   └── 💻 src/                         # Source code
│       ├── 🚀 main.tsx                 # React app entry
│       ├── 📱 App.tsx                  # Root component
│       ├── 🎨 App.css                  # Global styles
│       │
│       ├── 🌐 api/                     # API client layer
│       │   ├── client.ts               # Axios configuration
│       │   ├── auth.ts                 # Auth API calls
│       │   ├── equipment.ts            # Equipment API
│       │   ├── requests.ts             # Requests API
│       │   ├── departments.ts          # Departments API
│       │   └── teams.ts                # Teams API
│       │
│       ├── 🧩 components/              # React components
│       │   ├── 📦 common/              # Reusable components
│       │   │   ├── Button.tsx          # Custom button
│       │   │   └── Input.tsx           # Form input
│       │   │
│       │   ├── 🏗️ layout/              # Layout components
│       │   │   ├── DashboardLayout.tsx # Main layout wrapper
│       │   │   ├── Header.tsx          # Top navigation
│       │   │   ├── Sidebar.tsx         # Side navigation
│       │   │   └── ProtectedRoute.tsx  # Auth guard
│       │   │
│       │   └── 📋 requests/            # Feature-specific
│       │       ├── CreateRequestModal.tsx
│       │       └── CompleteRequestModal.tsx
│       │
│       ├── 📄 pages/                   # Route pages
│       │   ├── 🔐 auth/                # Authentication
│       │   │   ├── LoginPage.tsx       # Login form
│       │   │   └── RegisterPage.tsx    # Registration form
│       │   │
│       │   ├── 📊 dashboard/           # Dashboard
│       │   │   └── DashboardPage.tsx   # Main dashboard
│       │   │
│       │   ├── 🔧 equipment/           # Equipment management
│       │   │   ├── EquipmentListPage.tsx
│       │   │   └── EquipmentDetailPage.tsx
│       │   │
│       │   ├── 📋 requests/            # Request management
│       │   │   ├── RequestListPage.tsx
│       │   │   ├── KanbanBoard.tsx     # Drag-and-drop board
│       │   │   └── CalendarView.tsx    # Calendar interface
│       │   │
│       │   └── 👥 teams/               # Team management
│       │       └── TeamsListPage.tsx
│       │
│       ├── 💾 store/                   # State management
│       │   └── useAuthStore.ts         # Zustand auth store
│       │
│       ├── 📘 types/                   # TypeScript definitions
│       │   └── index.ts                # Shared types
│       │
│       └── 🔧 lib/                     # Utilities
│           └── utils.ts                # Helper functions
│
└── 📝 .env.example                     # Environment template
```

---

## 🚀 Quick Start Guide

### Prerequisites

<div align="center">

| Requirement | Version | Download Link |
|:-----------|:--------|:--------------|
| 📗 **Node.js** | 20.x or higher | [Download](https://nodejs.org/) |
| 🐘 **PostgreSQL** | 15+ | [Download](https://www.postgresql.org/download/) |
| 📦 **npm** | 10.x or higher | Included with Node.js |
| 🔧 **Git** | Latest | [Download](https://git-scm.com/) |

</div>

### Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker.git
cd GearGuard-The-Ultimate-Maintenance-Tracker
```

2️⃣ **Install backend dependencies**
```bash
cd backend
npm install
```

3️⃣ **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4️⃣ **Configure environment variables**

Create `.env` file in the `backend` directory:
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

5️⃣ **Initialize the database**
```bash
cd backend
npm run migrate          # Run database migrations
npm run db:seed         # Seed with sample data (optional)
```

6️⃣ **Start development servers**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev             # Starts on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev            # Starts on http://localhost:5173
```

### Access Points

<div align="center">

| Service | URL | Description |
|:--------|:----|:------------|
| 🎨 **Frontend** | http://localhost:5173 | React application |
| 🔙 **Backend API** | http://localhost:3000 | REST API server |
| 🏥 **Health Check** | http://localhost:3000/health | API status endpoint |
| 🗄️ **Prisma Studio** | http://localhost:5555 | Database GUI (`npm run db:studio`) |

</div>

---

## 🛠️ Technology Stack

<div align="center">

### 🎨 Frontend Technologies

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.11-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-000000?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![Axios](https://img.shields.io/badge/Axios-1.13-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Latest-F56565?style=for-the-badge)](https://lucide.dev/)
[![date-fns](https://img.shields.io/badge/date--fns-4.1-770C56?style=for-the-badge)](https://date-fns.org/)

### 🔙 Backend Technologies

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-9.0-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![bcrypt](https://img.shields.io/badge/bcrypt-2.4-CA4245?style=for-the-badge)](https://www.npmjs.com/package/bcryptjs)

### 🔧 Development Tools

[![ESLint](https://img.shields.io/badge/ESLint-9.39-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Nodemon](https://img.shields.io/badge/Nodemon-3.1-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)](https://nodemon.io/)
[![PM2](https://img.shields.io/badge/PM2-Latest-2B037A?style=for-the-badge&logo=pm2&logoColor=white)](https://pm2.keymetrics.io/)
[![PostCSS](https://img.shields.io/badge/PostCSS-8.5-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)](https://postcss.org/)
[![ts-node](https://img.shields.io/badge/ts--node-10.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typestrong.org/ts-node/)

</div>

---

## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| <kbd>POST</kbd> | `/api/auth/register` | Register new user account | ❌ |
| <kbd>POST</kbd> | `/api/auth/login` | Login and receive JWT token | ❌ |
| <kbd>GET</kbd> | `/api/auth/me` | Get current user profile | ✅ |
| <kbd>PUT</kbd> | `/api/auth/profile` | Update user profile | ✅ |
| <kbd>POST</kbd> | `/api/auth/change-password` | Change user password | ✅ |

### 🔧 Equipment Management

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| <kbd>GET</kbd> | `/api/equipment` | List all equipment | ✅ |
| <kbd>GET</kbd> | `/api/equipment/:id` | Get equipment details | ✅ |
| <kbd>POST</kbd> | `/api/equipment` | Create new equipment | ✅ Admin/Manager |
| <kbd>PUT</kbd> | `/api/equipment/:id` | Update equipment | ✅ Admin/Manager |
| <kbd>DELETE</kbd> | `/api/equipment/:id` | Delete equipment | ✅ Admin |
| <kbd>GET</kbd> | `/api/equipment/:id/history` | Get maintenance history | ✅ |
| <kbd>PATCH</kbd> | `/api/equipment/:id/status` | Update equipment status | ✅ |

### 📋 Maintenance Request Workflow

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| <kbd>GET</kbd> | `/api/requests` | List all requests (filtered) | ✅ |
| <kbd>GET</kbd> | `/api/requests/:id` | Get request details | ✅ |
| <kbd>POST</kbd> | `/api/requests` | Create maintenance request | ✅ |
| <kbd>PUT</kbd> | `/api/requests/:id` | Update request | ✅ |
| <kbd>DELETE</kbd> | `/api/requests/:id` | Delete request | ✅ Admin/Manager |
| <kbd>PATCH</kbd> | `/api/requests/:id/assign` | Assign request to technician | ✅ Manager |
| <kbd>PATCH</kbd> | `/api/requests/:id/status` | Update request status | ✅ |
| <kbd>POST</kbd> | `/api/requests/:id/complete` | Mark request complete | ✅ Technician |

### 🏢 Department & Team Management

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| <kbd>GET</kbd> | `/api/departments` | List all departments | ✅ |
| <kbd>POST</kbd> | `/api/departments` | Create department | ✅ Admin |
| <kbd>PUT</kbd> | `/api/departments/:id` | Update department | ✅ Admin/Manager |
| <kbd>DELETE</kbd> | `/api/departments/:id` | Delete department | ✅ Admin |
| <kbd>GET</kbd> | `/api/teams` | List all teams | ✅ |
| <kbd>POST</kbd> | `/api/teams` | Create team | ✅ Manager |
| <kbd>PUT</kbd> | `/api/teams/:id` | Update team | ✅ Manager |
| <kbd>DELETE</kbd> | `/api/teams/:id` | Delete team | ✅ Admin |
| <kbd>POST</kbd> | `/api/teams/:id/members` | Add team member | ✅ Manager |
| <kbd>DELETE</kbd> | `/api/teams/:id/members/:userId` | Remove team member | ✅ Manager |

---

## 🎯 Development Scripts

<div align="center">

### Backend Commands

| Command | Description |
|:--------|:------------|
| 🚀 `npm run dev` | Start development server with hot reload |
| 🏗️ `npm run build` | Build TypeScript to production JavaScript |
| ▶️ `npm start` | Run production server |
| 🗄️ `npm run migrate` | Run database migrations |
| 🌱 `npm run db:seed` | Seed database with sample data |
| 🎨 `npm run db:studio` | Launch Prisma Studio (database GUI) |
| 🔄 `npm run migrate:reset` | Reset database and re-run migrations |
| 🔧 `npm run prisma:generate` | Generate Prisma Client |

### Production Deployment (PM2)

| Command | Description |
|:--------|:------------|
| 🚀 `pm2 start dist/server.js --name gearguard-api` | Start API with PM2 process manager |
| 🔄 `pm2 restart gearguard-api` | Restart the application |
| 🛑 `pm2 stop gearguard-api` | Stop the application |
| 📊 `pm2 status` | Check application status |
| 📝 `pm2 logs gearguard-api` | View application logs |
| 📈 `pm2 monit` | Monitor CPU and memory usage |
| ⚙️ `pm2 startup` | Configure PM2 to start on system boot |
| 💾 `pm2 save` | Save current PM2 process list |

### Frontend Commands

| Command | Description |
|:--------|:------------|
| 🚀 `npm run dev` | Start Vite development server |
| 🏗️ `npm run build` | Build production bundle |
| 🔍 `npm run lint` | Run ESLint code quality checks |
| 👀 `npm run preview` | Preview production build locally |

</div>

---

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/gearguard?schema=public"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=3000
NODE_ENV="development"

# CORS Settings
FRONTEND_URL="http://localhost:5173"

# Optional: Email Service (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Optional: File Upload
MAX_FILE_SIZE="10mb"
UPLOAD_DIR="./uploads"

# PM2 Configuration (for production)
PM2_INSTANCES=2
PM2_MAX_MEMORY="512M"
```

### PM2 Ecosystem Configuration

Create an `ecosystem.config.js` file in the `backend` directory for PM2:

```javascript
module.exports = {
  apps: [{
    name: 'gearguard-api',
    script: './dist/server.js',
    instances: 2,
    exec_mode: 'cluster',
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL="http://localhost:3000/api"
VITE_API_TIMEOUT=30000

# Application Settings
VITE_APP_NAME="GearGuard"
VITE_APP_VERSION="1.0.0"

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true

# Optional: External Services
VITE_SENTRY_DSN="your-sentry-dsn"
VITE_GOOGLE_ANALYTICS_ID="UA-XXXXXXXXX-X"
```

---

## 🚨 Troubleshooting

<details>
<summary><strong>🔴 Database Connection Failed</strong></summary>

**Problem:** Cannot connect to PostgreSQL database

**Solutions:**
1. Verify PostgreSQL is running: `systemctl status postgresql` (Linux) or check Services (Windows)
2. Check your `DATABASE_URL` in `.env` matches your PostgreSQL credentials
3. Ensure PostgreSQL accepts connections: check `pg_hba.conf` and `postgresql.conf`
4. Create database manually: `createdb gearguard` or use Prisma: `npx prisma db push`
5. Test connection: `psql -U username -d gearguard`

</details>

<details>
<summary><strong>🔴 Port Already in Use</strong></summary>

**Problem:** Error: Port 3000 or 5173 is already in use

**Solutions:**
1. Find process using port: `lsof -i :3000` (Mac/Linux) or `netstat -ano | findstr :3000` (Windows)
2. Kill the process: `kill -9 <PID>` (Mac/Linux) or `taskkill /PID <PID> /F` (Windows)
3. Change port in configuration:
   - Backend: Set `PORT` in `.env`
   - Frontend: Add `--port 5174` to vite dev script in `package.json`

</details>

<details>
<summary><strong>🔴 JWT Token Expired or Invalid</strong></summary>

**Problem:** 401 Unauthorized errors in API requests

**Solutions:**
1. Clear browser localStorage: `localStorage.clear()` in console
2. Check JWT_SECRET matches between login and verification
3. Verify token expiration: Increase `JWT_EXPIRES_IN` in `.env`
4. Check system clock synchronization (tokens are time-sensitive)
5. Re-login to get fresh token

</details>

<details>
<summary><strong>🔴 Prisma Client Not Generated</strong></summary>

**Problem:** `@prisma/client` import errors

**Solutions:**
1. Generate Prisma Client: `npm run prisma:generate`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check schema.prisma syntax: `npx prisma validate`
4. Ensure Prisma version compatibility in package.json
5. Try: `npx prisma generate --schema=./prisma/schema.prisma`

</details>

<details>
<summary><strong>🔴 CORS Errors in Frontend</strong></summary>

**Problem:** API requests blocked by CORS policy

**Solutions:**
1. Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
2. Check CORS middleware configuration in `server.ts`
3. Ensure backend is running before frontend makes requests
4. Clear browser cache and cookies
5. Check browser console for specific CORS error details

</details>

---

## 📈 Performance Features

<div align="center">

| Feature | Description | Benefit |
|:--------|:------------|:--------|
| ⚡ **Lazy Loading** | Code-split routes with React.lazy | Faster initial page load |
| 🗄️ **Database Indexing** | Optimized Prisma queries with indexes | Sub-100ms query times |
| 🎯 **Query Optimization** | Efficient select and include strategies | Reduced database load |
| 💾 **State Management** | Lightweight Zustand store | Minimal re-renders |
| 🚀 **Vite Build Tool** | ESBuild-powered bundling | Lightning-fast HMR |
| 📦 **Production Build** | Minified, tree-shaken bundles | 70% smaller bundle size |

</div>

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help makes GearGuard better for everyone.

### How to Contribute

1️⃣ **Fork the repository** - Click the "Fork" button at the top right of this page

2️⃣ **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3️⃣ **Commit your changes**
```bash
git commit -m "Add: Amazing new feature"
```

4️⃣ **Push to your branch**
```bash
git push origin feature/amazing-feature
```

5️⃣ **Open a Pull Request** - Submit a PR with a clear description of your changes

### Code Guidelines
- ✅ Follow existing code style and conventions
- ✅ Write meaningful commit messages
- ✅ Add tests for new features
- ✅ Update documentation as needed
- ✅ Ensure all tests pass before submitting

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">

Special thanks to the open-source community and these amazing technologies:

- 💙 [**React Team**](https://reactjs.org/) - For the incredible frontend library
- 💚 [**Node.js Foundation**](https://nodejs.org/) - For the powerful JavaScript runtime
- 🐘 [**PostgreSQL Community**](https://www.postgresql.org/) - For the robust database
- 🔷 [**Prisma**](https://www.prisma.io/) - For the excellent ORM and developer experience
- ⚡ [**Vite Team**](https://vitejs.dev/) - For the blazing-fast build tool
- 🎨 [**Tailwind Labs**](https://tailwindcss.com/) - For the utility-first CSS framework

</div>

---

<div align="center">

## 🌟 **Transform Your Maintenance Management Today!**

*Stop losing time on spreadsheets. Start optimizing with GearGuard.*

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker?style=social)](https://github.com/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker?style=social)](https://github.com/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker?style=social)](https://github.com/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker/watchers)

### 🎯 Take Action Now

[⭐ **Star this Repository**](https://github.com/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker) • [🐛 **Report a Bug**](https://github.com/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker/issues) • [✨ **Request Feature**](https://github.com/YOUR_USERNAME/GearGuard-The-Ultimate-Maintenance-Tracker/issues)

---

### 💬 Questions? Reach out!

[![Email](https://img.shields.io/badge/Email-your.email%40example.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/yourhandle)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YOUR_USERNAME)

---

**Made with ❤️ by the GearGuard Team**

*Empowering teams to maintain excellence, one request at a time.*

</div>
