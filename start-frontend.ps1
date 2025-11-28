Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Write-Host ""
Set-Location Frontend

# Clean Vite cache if it exists (fixes permission errors)
if (Test-Path "node_modules\.vite") {
    Write-Host "Cleaning Vite cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules\.vite" -ErrorAction SilentlyContinue
}

npm run dev

