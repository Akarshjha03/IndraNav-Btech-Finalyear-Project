@echo off
echo Cleaning Vite cache...
if exist node_modules\.vite (
    echo Removing .vite directory...
    rmdir /s /q node_modules\.vite
    echo Vite cache cleaned!
) else (
    echo No .vite cache found.
)
pause

