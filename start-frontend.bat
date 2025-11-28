@echo off
echo Starting Frontend Server...
echo.
cd Frontend

REM Clean Vite cache if it exists (fixes permission errors)
if exist node_modules\.vite (
    echo Cleaning Vite cache...
    rmdir /s /q node_modules\.vite 2>nul
)

call npm run dev
pause

