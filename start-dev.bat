@echo off
echo Starting Legal Lens AI Development Environment...

echo.
echo Starting Flask Backend...
start "Flask Backend" cmd /k "cd backend && python run.py"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Next.js Frontend...
start "Next.js Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
