@echo off
REM Windows setup script for Lecture Scheduling Module

echo.
echo Installing Lecture Scheduling Module...
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd server
call npm install

REM Install frontend dependencies
echo.
echo Installing frontend dependencies...
cd ..\client
call npm install

echo.
echo ========================================
echo Installation complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Make sure MongoDB is running
echo.
echo 2. Start the backend (in terminal 1):
echo    cd server
echo    npm run dev
echo.
echo 3. Start the frontend (in terminal 2):
echo    cd client
echo    npm run dev
echo.
echo 4. Open your browser and go to http://localhost:3000
echo.
echo Demo credentials:
echo Email: admin@example.com
echo Password: admin123
echo.
pause
