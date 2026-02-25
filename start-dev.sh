#!/bin/bash

# IT Club Development Startup Script
# This script starts both frontend and backend development servers

echo "🚀 Starting IT Club Development Environment..."
echo ""

# Start PostgreSQL with Docker
echo "📦 Starting PostgreSQL database..."
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Start Backend
echo "🔧 Starting Backend (NestJS)..."
cd backend
cp .env.example .env 2>/dev/null || true
npm run start:dev &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "🎨 Starting Frontend (Next.js)..."
cd frontend
cp .env.example .env.local 2>/dev/null || true
bun run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Development servers started!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend:  http://localhost:3001/api"
echo "📍 API Docs: http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; docker-compose down; exit" INT
wait
