@echo off
echo Starting Backend Server...
echo.
cd Backend
python -m uvicorn fastapi_server:app --reload --port 8000
pause

