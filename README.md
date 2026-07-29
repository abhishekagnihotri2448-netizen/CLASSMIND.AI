# EduAI – Full Stack Smart Learning Platform

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 20 + TypeScript + Angular Material |
| Backend | FastAPI (Python) |
| AI | OpenAI API / Llama/Qwen via Ollama |
| Speech | OpenAI Whisper |
| Database | PostgreSQL |
| Cache | Redis |
| Task Queue | Celery + Redis |
| Vector DB | FAISS / ChromaDB |
| Auth | JWT + OAuth (Google Sign-In) |
| Media | Cloudinary / AWS S3 |
| Charts | ApexCharts |
| Push Notif | Firebase Cloud Messaging |
| Deploy | Docker + Nginx + Render/Railway/AWS |

## Project Structure

```
eduai/
├── frontend/          # Angular 20 app
├── backend/           # FastAPI app
├── docker-compose.yml
├── nginx/
└── .env.example
```

## Quick Start

```bash
# 1. Clone and setup env
cp .env.example .env

# 2. Start all services
docker-compose up --build

# 3. Frontend dev server (separate terminal)
cd frontend && npm install && ng serve

# 4. Backend dev server (separate terminal)
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
```

## URLs
- Frontend: http://localhost:4200
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- pgAdmin: http://localhost:5050
