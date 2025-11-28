Write-Host "Starting Backend Server..." -ForegroundColor Green
Write-Host ""
Set-Location Backend
python -m uvicorn fastapi_server:app --reload --port 8000

