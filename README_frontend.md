# Note Loom — College Management Platform

> **Full-Stack Project · Multi-Tenant · Beta V1.0.43**

Note Loom is a full-stack, multi-tenant college management platform that unifies academics, examinations, attendance, library management, AI-powered study tools, and a complete internal IT administration panel — all under a single system.

## Quick Start

```bash
# Frontend
npm install
npm run dev
```

```bash
# Backend
cd backend
npm install
node server.js
```

Open `http://localhost:5173` in your browser. Backend runs on port `4000`.

## Tech Stack

### Frontend
- **React 18** + **Vite 7** — fast HMR development
- **React Router DOM v6** — client-side routing across portals
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion** — animations and transitions
- **Axios** — HTTP client for all API calls
- **Lucide React** — icon library
- **React Markdown** — renders AI responses in markdown
- **Mermaid.js** — renders AI-generated mind map diagrams
- **React PDF + React Player** — in-browser document and video viewing
- **jsPDF + AutoTable** — PDF export for admit cards and reports
- **React QR Code + React Barcode** — library card generation
- **Supabase JS + Firebase** — cloud storage for profile pictures

### Backend
- **Node.js + Express** — REST API server
- **MongoDB Atlas + Mongoose** — primary database with 33 collections
- **JWT + bcryptjs** — authentication and password hashing
- **Nodemailer** — OTP email delivery via Gmail SMTP
- **Google Gemini 2.5 Flash Lite** — primary AI provider
- **Cloudflare Workers AI** — AI fallback (Llama 3, Whisper)
- **Tesseract.js** — local OCR engine (last-resort fallback)
- **pdf-parse + pdf-poppler** — digital and scanned PDF extraction
- **mammoth / ExcelJS / officeparser** — DOCX, XLSX, PPTX text extraction
- **fluent-ffmpeg + ffmpeg-static** — video-to-audio extraction for lecture AI
- **Multer** — file upload handling
- **sharp** — image resizing and compression

## Features

### 🎓 College Portal
- **Student Dashboard** — attendance overview, exam form submission, library access, LMS progress tracker
- **Faculty Dashboard** — attendance marking, content uploads, leave applications, routine viewer
- **College Admin Panel** — full user management, batch and department control, exam session management, feature configuration

### 📚 Learning Management System (LMS)
- Virtual classrooms with module/chapter structure per batch
- Faculty uploads files, YouTube links, and text content per module
- Per-student content progress tracking
- Download permission toggle per content item

### 📝 Examination Management (COE)
- Full exam session lifecycle: create → activate → archive
- Dynamic student eligibility check (batch, semester, Odd/Even cycle)
- Exam form submission with regular and backlog subject selection
- Marks upload (bulk array), result publishing, and student result view
- Question bank: previous year paper uploads by faculty

### 📅 Attendance System
- Faculty initializes attendance per batch per date
- Period-wise marking: Present / Absent / Late
- Routine-aware: auto-fetches today's periods, subjects, and assigned faculty
- Supports backdated attendance correction

### 📖 Library Management (Dual)
- **Digital Library**: store external resource links (PDF, video, web); faculty uploads require admin approval
- **Physical Library**: copy-level book inventory; checkout, return, and removal with 48-hour deletion buffer; lookup users by email, UID, roll number, or employee ID; QR/barcode generation per book card

### 🤖 AI Study Assistant
- **Chat Mode** — friendly AI assistant for general academic queries
- **Tutor Mode** — Socratic mode that guides with questions rather than direct answers
- **Mind Map Mode** — generates Mermaid.js flowcharts rendered interactively in-browser
- **Summarize & Solve** — upload any file (PDF, image, DOCX, XLSX, PPTX, audio, video) and get an AI-generated summary or solution
- **Lecture Video AI** — analyzes stored classroom videos: transcribes audio via Whisper, then summarizes the lecture content via Llama 3
- **Dual AI Strategy**: Gemini primary → Cloudflare fallback → Tesseract.js local OCR (last resort) — ensuring near-100% uptime

### 🖥 IT Administration Portal
- **College Management**: create, edit, suspend, and schedule deletion of colleges (auto-incremental college codes from 1001)
- **Feature Manager**: toggle any feature ON/OFF per role per college without code deployments
- **User Management**: manage all IT staff accounts
- **Request Handling**: process college admin and manager account requests

### 🔐 Authentication & Sessions
- Email OTP verification (6-digit, 10-minute TTL) before account creation
- Role-based multi-tenant sign-in: college code scopes every session to a specific college
- Sessions stored in MongoDB for instant invalidation on logout or suspension
- Two separate auth middlewares: `setTenantContext` (college portal) and `setITContext` (IT portal)

### 🏢 Multi-Tenancy
- Each college is a fully isolated tenant — all data, users, and features are scoped by `tenantId`
- Every API request is automatically scoped via session middleware; no manual filtering required in route handlers
- IT admins can configure features per role per college via `SystemConfig`, all without touching code

## Portals

| Portal | Users | Access |
|---|---|---|
| College Portal | Students, Faculty, College Admins | `/` after login with college code |
| IT Portal | Noteloom Admins, Noteloom Managers | `/it-admin` separate login |
| Public | Visitors | Landing page, login, signup |

## Deployment

Frontend (static):
```bash
npm run build   # outputs to dist/
```
Deploy `dist/` to Vercel / Netlify. The `vercel.json` at root handles SPA routing.

Backend: Deploy to any Node.js host (Railway, Render, VPS). Set all environment variables from `.env`.

## Environment Variables

```
# Backend (.env)
MONGO_URI=
JWT_SECRET=
GMAIL_USER=
GMAIL_APP_PASSWORD=
GEMINI_API_KEY=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

## Developers

**Shuvankar Debnath**

See [CODEBASE.md](./CODEBASE.md) for full project structure documentation.

---

> This is a Beta build — it may be prone to bugs and does not represent the final release.
> Copyright © 2026 Note Loom. All Rights Reserved.
