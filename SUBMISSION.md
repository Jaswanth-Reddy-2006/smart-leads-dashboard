# Submission Documentation: Smart Leads Dashboard

This document compiles all the required materials and information for the **Smart Leads Dashboard** project submission.

---

## 1. Candidate Information

- **Name**: R Jaswanth Reddy
- **Email**: jaswanthre9@gmail.com
- **Phone**: +91 8008154808
- **GitHub Profile**: [https://github.com/Jaswanth-Reddy-2006](https://github.com/Jaswanth-Reddy-2006)
- **LinkedIn Profile**: [https://www.linkedin.com/in/jasreaug/](https://www.linkedin.com/in/jasreaug/)
- **Resume File**: [`R_Jaswanth_Reddy_Resume.pdf`](./R_Jaswanth_Reddy_Resume.pdf) (included in the root of the repository)

---

## 2. GitHub Repository & Deployment Links

- **GitHub Repository**: [https://github.com/Jaswanth-Reddy-2006/smart-leads-dashboard](https://github.com/Jaswanth-Reddy-2006/smart-leads-dashboard)
- **Live Frontend (Netlify)**: [https://smart-leads-dashboard-jaswanth.netlify.app](https://smart-leads-dashboard-jaswanth.netlify.app)
- **Live Backend API (Google Cloud Run)**: [https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app](https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app)
- **API Health Check**: [https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app/health](https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app/health)

---

## 3. Environment Configuration (`.env.example`)

### Root `.env.example`
```bash
MONGO_USERNAME=leads_admin
MONGO_PASSWORD=change_me
JWT_SECRET=replace_with_a_long_random_secret
```

### Backend (`server/.env.example`)
```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/leads_db
# Atlas example:
# MONGO_URI=mongodb+srv://<username>:<url-encoded-password>@<cluster-host>/leads_db?retryWrites=true&w=majority&appName=<app-name>
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`client/.env.example`)
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 4. API Documentation

| Method | Endpoint | Authentication | Allowed Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | No | Any | Register a new user |
| **POST** | `/api/auth/login` | No | Any | Login and obtain JWT token |
| **GET** | `/api/auth/me` | Yes | Any | Retrieve authenticated user profile |
| **GET** | `/api/leads` | Yes | Any | Get paginated, searched, filtered, and sorted leads |
| **POST** | `/api/leads` | Yes | Any | Create a new sales lead |
| **GET** | `/api/leads/export` | Yes | Any | Export current filtered list to CSV |
| **GET** | `/api/leads/:id` | Yes | Any | Retrieve details of a single lead |
| **PUT** | `/api/leads/:id` | Yes | Any | Update details of an existing lead |
| **DELETE**| `/api/leads/:id` | Yes | Admin | Delete a lead (restricted to Admins) |

---

## 5. Local & Docker Setup Instructions

### Option A: Running Locally with Node.js

#### 1. Setup Backend Server
```bash
cd server
npm install
cp .env.example .env
# Edit server/.env to fill in MONGO_URI with your MongoDB Atlas or local URI
npm run dev
```

#### 2. Setup Frontend Client
```bash
cd client
npm install
cp .env.example .env
# Edit client/.env to set VITE_API_BASE_URL to http://localhost:5000/api
npm run dev
```

### Option B: Running with Docker Compose
From the root of the project repository, copy the `.env.example` file and run:
```bash
cp .env.example .env
docker compose up --build
```
This builds and boots both services:
- **Client Application**: accessible on [http://localhost:3000](http://localhost:3000)
- **Backend API Server**: accessible on [http://localhost:5000](http://localhost:5000)

---

## 6. Architecture & Implementation Highlights

- **Vibrant Premium UI**: Built with a sleek dark mode dashboard, responsive status/source badges, real-time KPI metrics, search filtering, and page navigation.
- **Robust State Management**: Powered by Zustand for seamless data hydration and UI reactivity.
- **Typesafe API Contracts**: Validation layer using Zod guarantees clean payloads between frontend and backend.
- **CI/CD Automation**: Integrated with a automated GitHub Actions workflow to build, push to Artifact Registry, and deploy directly to Google Cloud Run.
