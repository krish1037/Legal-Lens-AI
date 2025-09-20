#!/bin/bash

echo "Starting Legal Lens AI Development Environment..."

echo ""
echo "Starting Flask Backend..."
cd backend && python legal_backend/main.py &
BACKEND_PID=$!

echo ""
echo "Waiting for backend to start..."
sleep 3

echo ""
echo "Starting Next.js Frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $BACKEND_PID $FRONTEND_PID
