## IndraNav — Drive Smart

A dual-part project combining a modern React dashboard with an edge ML pipeline for driver drowsiness detection and behavior analytics. Built with Vite + React + TypeScript, Tailwind, shadcn/ui, Supabase, and a Python-based computer vision model.

---

### Monorepo Structure

```
Indranav Project/
├─ IndraNav-Btech-Finalyear-Project/
│  └─ Indranav Dashboard/
│     └─ indra-nav-drive-smart/          # Vite + React + TS dashboard
│        ├─ src/
│        │  ├─ components/
│        │  ├─ pages/
│        │  ├─ integrations/supabase/
│        │  └─ main.tsx
│        ├─ public/
│        ├─ supabase/                    # Supabase meta + SQL migrations
│        ├─ package.json
│        └─ vite.config.ts
└─ ML Model/                             # Python CV model (drowsiness)
   ├─ assets/
   ├─ models/
   ├─ test_camera.py
   └─ simple_test.py
```

Note: If the `ML Model` folder is not present locally, ensure it is synced from your source of truth.

---

### Features

- **AI-driven insights**: focus score, behavior monitoring, weekly reports
- **Drowsiness monitoring**: real-time detection hooks and emergency alert pathway
- **Routing intelligence**: weather-aware route insights
- **Modern UI**: shadcn/ui + Tailwind + Radix primitives
- **Data & auth**: Supabase-backed

---

### Prerequisites

- **Node.js** ≥ 18 and npm (or pnpm/yarn)
- **Git**
- **Python** 3.9–3.11 for the ML component
- (Windows + `dlib`) Prefer Conda or prebuilt wheels for easier install

---

### Quick Start

#### 1) Frontend Dashboard

```bash
cd "IndraNav-Btech-Finalyear-Project/Indranav Dashboard/indra-nav-drive-smart"
npm install
npm run dev
```

- Dev server: `http://localhost:5173` (default Vite port)

##### Environment Variables (Recommended)

Current code includes Supabase credentials in `src/integrations/supabase/client.ts`. For production, move these to Vite env variables and import from `import.meta.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Create `.env.local` in the dashboard folder:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then update `src/integrations/supabase/client.ts` to read from env or refactor to a small config util. Avoid committing real keys.

##### Common Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview built app locally
- `npm run lint` — lint source

---

#### 2) Supabase Setup

This project includes a `supabase/` directory with config and SQL migrations.

Options:
- Use Supabase Studio to manually create tables/functions and run SQL
- Or use the Supabase CLI to apply migrations (requires `supabase init` on your machine)

Minimal steps:
1. Create a Supabase project and obtain the project URL and anon/public key
2. Apply SQL from `supabase/migrations/*.sql`
3. Update your dashboard environment variables

Helpful docs: [`https://supabase.com/docs`](https://supabase.com/docs) (Studio, Auth, Policies, Storage)

---

#### 3) ML Model (Drowsiness Detection)

Create and activate a Python environment, then install dependencies typically used for eye-aspect/drowsiness pipelines:

- `opencv-python`
- `dlib` (face landmarking; use Conda or prebuilt wheel on Windows)
- `imutils`
- `numpy`
- `scipy`

Example using pip (Linux/macOS):

```bash
cd "ML Model"
python -m venv .venv
# Windows PowerShell
. .venv/Scripts/Activate.ps1
# macOS/Linux
# source .venv/bin/activate

pip install --upgrade pip
pip install opencv-python dlib imutils numpy scipy
```

Windows note: installing `dlib` via pip may fail without build tools. Prefer Conda:

```bash
conda create -n indranav-ml python=3.10 -y
conda activate indranav-ml
conda install -c conda-forge dlib opencv numpy scipy -y
pip install imutils
```

Place the landmark model file at `ML Model/models/shape_predictor_68_face_landmarks.dat` (already included). Ensure your camera is accessible.

Run tests:

```bash
python simple_test.py
python test_camera.py
```

If you have a combined script (e.g., `Drowsiness_Detection.py`), run it similarly:

```bash
python Drowsiness_Detection.py
```

---

### Tech Stack

- **Frontend**: Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui, Radix UI
- **State & Data**: TanStack Query, React Hook Form, Zod
- **Charts**: Recharts
- **Auth/Backend**: Supabase (`@supabase/supabase-js`)
- **CV/ML (local)**: OpenCV, dlib, imutils, NumPy, SciPy

---

### Development Conventions

- TypeScript-first, explicit types for exported APIs
- Prefer early returns and clear guard clauses
- Keep UI components small and composable under `src/components`
- Pages under `src/pages` with `react-router-dom`
- Shared utilities in `src/lib`; hooks in `src/hooks`

---

### Deployment

- Dashboard: Vercel/Netlify/Cloudflare Pages are supported
- Ensure `VITE_*` env variables are configured in your hosting provider
- Use `npm run build` → upload `dist/`

Supabase is fully managed; configure Auth, RLS, and Database in the Supabase dashboard.

---

### Security & Secrets

- Do not commit real Supabase keys. Use `VITE_` env vars for the frontend
- For server-side keys (if later introduced), use a backend or edge function — never ship them to the client

---

### Troubleshooting

- Port already in use: change Vite port (`--port 5174`) or kill the process
- `dlib` installation errors (Windows): use Conda or prebuilt wheels
- Webcam not detected: ensure camera permissions and correct device index in scripts
- Supabase 401/403: verify project URL, anon key, and RLS policies

---

### Acknowledgements

- Radix UI, shadcn/ui
- Supabase
- OpenCV, dlib community
