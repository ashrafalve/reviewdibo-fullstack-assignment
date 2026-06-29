# Reviewdibo Fullstack Assignment

Full-stack application built with Clean Architecture and SOLID principles.

## Tech Stack

**Frontend**: Next.js 15, TypeScript, Tailwind CSS, Axios  
**Backend**: FastAPI, SQLAlchemy, Alembic, Pydantic  
**Database**: PostgreSQL

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure PostgreSQL connection in .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Scripts

| Folder    | Command                     | Description          |
|-----------|-----------------------------|----------------------|
| frontend  | `npm run dev`               | Start dev server     |
| frontend  | `npm run build`             | Production build     |
| frontend  | `npm run lint`              | Run ESLint           |
| backend   | `uvicorn app.main:app --reload` | Start backend   |
| backend   | `alembic upgrade head`      | Run migrations       |
