# Reviewdibo

A full-stack product review platform built with FastAPI and Next.js.

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | Next.js 16, TypeScript, Tailwind CSS 4, Axios   |
| Backend    | FastAPI, SQLAlchemy 2.0, Alembic, Pydantic      |
| Database   | PostgreSQL                                      |
| Auth       | JWT (python-jose), bcrypt (passlib)              |

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── routers/         # FastAPI route handlers
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── services/        # Business logic layer
│   │   ├── auth.py          # JWT & password utilities
│   │   ├── config.py        # App configuration (pydantic-settings)
│   │   ├── database.py      # DB engine & session management
│   │   ├── main.py          # FastAPI app entry point
│   │   └── seed.py          # Demo data seeder
│   ├── alembic/             # Database migrations
│   └── tests/
├── frontend/
│   ├── app/                 # Next.js App Router pages
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── lib/             # API client utilities
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
└── README.md
```

## Setup

### Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (macOS/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Run migrations
alembic upgrade head

# Seed demo data
python -m app.seed

# Start the server
uvicorn app.main:app --reload
```

The API is available at `http://localhost:8000/docs` (Swagger UI) or `http://localhost:8000/redoc` (ReDoc).

### Frontend

```bash
cd frontend

# Configure environment
cp .env.example .env.local

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app is available at `http://localhost:3000`.

## API Documentation

Interactive API docs are available at `/docs` when the backend is running.

### Endpoints

| Method | Path               | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | `/health`          | Health check                   |
| GET    | `/api/v1/products` | List all products              |
| GET    | `/api/v1/products` | Search products (?search=...)  |
| GET    | `/api/v1/products` | Filter by rating (?min_rating) |
| GET    | `/api/v1/products/{id}` | Get product detail + reviews |
| POST   | `/api/v1/reviews`  | Create a review                |
| PUT    | `/api/v1/reviews/{id}` | Update a review            |
| DELETE | `/api/v1/reviews/{id}` | Delete a review            |

### Query Parameters

| Parameter    | Type | Location | Description                     |
| ------------ | ---- | -------- | ------------------------------- |
| search       | str  | Query    | Search product by title (ILIKE) |
| min_rating   | int  | Query    | Minimum average rating (1-5)    |

### Schemas

**ProductResponse**
```json
{
  "id": 1,
  "title": "Product name",
  "description": "Product description",
  "image_url": "https://...",
  "average_rating": 4.5,
  "review_count": 12
}
```

**ReviewCreate**
```json
{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "product_id": 1,
  "rating": 5,
  "comment": "Great product!"
}
```

**ReviewResponse**
```json
{
  "id": 1,
  "rating": 5,
  "comment": "Great product!",
  "user_name": "John Doe",
  "product_id": 1,
  "created_at": "2026-06-29T10:00:00"
}
```

## Scripts

| Directory | Command                    | Description              |
| --------- | -------------------------- | ------------------------ |
| frontend  | `npm run dev`              | Start development server |
| frontend  | `npm run build`            | Production build         |
| frontend  | `npm run lint`             | Run ESLint               |
| backend   | `uvicorn app.main:app --reload` | Start development server |
| backend   | `alembic upgrade head`     | Run database migrations  |
| backend   | `alembic downgrade -1`     | Rollback last migration  |
| backend   | `python -m app.seed`       | Seed demo data           |

## Deployment

### Backend (FastAPI)

```bash
cd backend

# Install production dependencies
pip install -r requirements.txt

# Run with uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

Environment variables required:
- `DATABASE_URL` — PostgreSQL connection string
- `SECRET_KEY` — JWT signing secret
- `ALGORITHM` — JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` — Token expiry (default: 30)
- `ENVIRONMENT` — `development` or `production`

### Frontend (Next.js)

```bash
cd frontend

# Build
npm run build

# Start production server
npm start
```

Environment variables required:
- `NEXT_PUBLIC_API_URL` — Backend API base URL (e.g. `https://api.example.com/api/v1`)
