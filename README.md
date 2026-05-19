# Smart Leads Dashboard

A production-grade Lead Management System built with the MERN stack and TypeScript.

## Live Deployments

- **Frontend Application**: [https://smart-leads-dashboard-jaswanth.netlify.app](https://smart-leads-dashboard-jaswanth.netlify.app)
- **Backend API**: [https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app](https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app)
- **API Health Check**: [https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app/health](https://smart-leads-dashboard-api-qiwnf6awba-uc.a.run.app/health)


## Tech Stack

- React.js, TypeScript, TailwindCSS, Vite
- Node.js, Express.js, TypeScript
- MongoDB, Mongoose
- JWT, bcrypt
- Zustand, Axios, Zod
- Docker and Docker Compose

## Features

- JWT Authentication with Role-Based Access Control (Admin / Sales)
- Full CRUD for leads
- Advanced filtering: status, source, debounced search, sort
- Backend pagination with 10 leads per page
- CSV export with current filters applied
- Dark mode with localStorage persistence
- Docker support

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB or Docker

### MongoDB Setup

You need one of these MongoDB options before starting the backend.

#### Option A: MongoDB Atlas

What you need from Atlas:

- Database username
- Database password
- Cluster host
- Network access for your current IP

Steps:

1. Open MongoDB Atlas and select your project.
2. Go to **Database Access**.
3. Click **Add New Database User**.
4. Choose **Password** authentication.
5. Create a user such as `smartleads`.
6. Use a simple development password first, such as `SmartLeads12345`.
7. Set privileges to **Read and write to any database**.
8. Go to **Network Access**.
9. Click **Add IP Address**.
10. Choose **Add Current IP Address**. For temporary development access only, `0.0.0.0/0` also works.
11. Go to **Database**, click **Connect** on your cluster, then choose **Drivers**.
12. Copy the connection string and put the username, password, and database name into it.

Example `server/.env`:

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://smartleads:SmartLeads12345@cluster0.gwdrfxt.mongodb.net/leads_db?retryWrites=true&w=majority
JWT_SECRET=this_is_a_long_secret_key_for_smart_leads
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

If your password contains special characters like `@`, `#`, `/`, `?`, or `&`, URL-encode it before using it in `MONGO_URI`.

#### Option B: Local MongoDB With Docker

From the project root:

```bash
docker compose -f docker-compose.dev.yml up -d
```

Use this in `server/.env`:

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/leads_db
JWT_SECRET=this_is_a_long_secret_key_for_smart_leads
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### Local Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

Verify the backend after `npm run dev`:

```text
http://localhost:5000/health
```

Expected response:

```json
{
  "success": true,
  "message": "Healthy",
  "data": {
    "status": "ok"
  }
}
```

### Docker Setup

```bash
cp .env.example .env
docker compose up --build
```

The Docker client is available at `http://localhost:3000`.

## API Documentation

| Method | Endpoint | Auth | Role | Description |
| --- | --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Any | Register new user |
| POST | `/api/auth/login` | No | Any | Login |
| GET | `/api/auth/me` | Yes | Any | Get current user |
| GET | `/api/leads` | Yes | Any | Get paginated and filtered leads |
| POST | `/api/leads` | Yes | Any | Create lead |
| GET | `/api/leads/export` | Yes | Any | Export matching leads as CSV |
| GET | `/api/leads/:id` | Yes | Any | Get single lead |
| PUT | `/api/leads/:id` | Yes | Any | Update lead |
| DELETE | `/api/leads/:id` | Yes | Admin | Delete lead |

### Lead Query Parameters

- `status`: `New`, `Contacted`, `Qualified`, `Lost`
- `source`: `Website`, `Instagram`, `Referral`
- `search`: partial name or email search
- `sort`: `latest` or `oldest`
- `page`: page number, defaults to `1`
- `limit`: page size, defaults to `10`

### Example Requests

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"password123\",\"role\":\"admin\"}"
```

Create lead:

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d "{\"name\":\"Rahul Sharma\",\"email\":\"rahul@example.com\",\"status\":\"Qualified\",\"source\":\"Instagram\"}"
```

Filter leads:

```bash
curl "http://localhost:5000/api/leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1&limit=10" \
  -H "Authorization: Bearer <token>"
```

## Architecture Decisions

- Zustand over Redux: lighter, no boilerplate, excellent TypeScript support
- Zod for validation: runtime type safety that mirrors TypeScript types
- Service layer: keeps controllers thin and business logic testable
- Mongoose indexes: optimized filtering and search on common lead queries
- Centralized error handling: consistent API failure responses

## Verification Checklist

- `npm run typecheck` in `server`
- `npm run build` in `client`
- `docker compose up --build`
