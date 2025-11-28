# How to Start the Drowsiness Detection System

## Quick Start (Two Terminal Windows)

You need to run both the **Backend** and **Frontend** in separate terminal windows.

### Option 1: Manual Start (Recommended for First Time)

#### Terminal 1 - Start Backend Server:
```powershell
cd Backend
python -m uvicorn fastapi_server:app --reload --port 8000
```

**OR** if you have uvicorn installed globally:
```powershell
cd Backend
uvicorn fastapi_server:app --reload --port 8000
```

#### Terminal 2 - Start Frontend:
```powershell
cd Frontend
npm install  # Only needed first time or after package.json changes
npm run dev
```

### Option 2: Using the Start Scripts

#### Windows PowerShell:
1. Right-click `start-backend.ps1` → "Run with PowerShell"
2. Open a new PowerShell window
3. Right-click `start-frontend.ps1` → "Run with PowerShell"

#### Windows Command Prompt:
1. Double-click `start-backend.bat`
2. Open a new Command Prompt window
3. Double-click `start-frontend.bat`

## After Starting:

1. **Backend** will run on: `http://localhost:8000`
2. **Frontend** will run on: `http://localhost:3000` (or check the terminal output)

3. Open your browser and go to: **http://localhost:3000**

4. Navigate to the **Live Dashboard** and click **"START SYSTEM"**

## Troubleshooting:

- **Backend not starting?** 
  - Make sure Python and required packages are installed
  - Check if camera is available
  - Install uvicorn: `pip install uvicorn fastapi`

- **Frontend not starting?**
  - Run `npm install` in the Frontend directory
  - Check if port 3000 is already in use

- **CORS errors?**
  - Make sure backend is running on port 8000
  - Check browser console for specific error messages

## Prerequisites:

### Backend Requirements:
- Python 3.7+
- Install dependencies: `pip install fastapi uvicorn opencv-python dlib imutils pygame scipy numpy`

### Frontend Requirements:
- Node.js (v14 or higher)
- npm (comes with Node.js)

