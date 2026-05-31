# Codebase Structure

> Complete map of every file in this project — what it does and how it connects.

---

## Root

```
noteloom-frontend/
├── .env                        # Frontend environment variables (Supabase, Firebase, API base URL)
├── .gitignore                  # Git ignore rules
├── README.md                   # Project overview & quick start
├── CODEBASE.md                 # ← You are here
├── index.html                  # Vite entry HTML — mounts #root
├── package.json                # Frontend dependencies (React, Vite, Tailwind, Axios, etc.)
├── package-lock.json           # Lockfile
├── vite.config.js              # Vite configuration — dev server, proxy to backend
├── tailwind.config.cjs         # Tailwind theme extensions
├── postcss.config.cjs          # PostCSS config for Tailwind
├── vercel.json                 # Vercel SPA routing rewrite rules
├── public/
│   └── webdata/                # Static assets served publicly (icons, images)
└── src/                        # All frontend source code
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | Core UI framework |
| Vite | 7 | Build tool & dev server |
| React Router DOM | v6 | Client-side routing |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | latest | Animations & page transitions |
| Axios | latest | HTTP client for all API calls |
| Lucide React | latest | Icon library |
| React Markdown | latest | Renders AI markdown responses |
| Mermaid.js | latest | Renders AI-generated mind maps |
| React PDF | latest | In-browser PDF viewer |
| React Player | latest | Embedded classroom video player |
| jsPDF + AutoTable | latest | PDF export (admit cards, reports) |
| React QR Code | latest | QR code generation for library cards |
| React Barcode | latest | Barcode generation for library cards |
| date-fns | latest | Date formatting utilities |
| Supabase JS | latest | Cloud storage (profile pictures) |
| Firebase | latest | Additional cloud services |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 18+ | REST API server |
| MongoDB Atlas | — | Primary database |
| Mongoose | latest | ODM / schema management |
| JWT (jsonwebtoken) | latest | Session token signing |
| bcryptjs | latest | Password hashing |
| Multer | latest | File upload handling |
| Nodemailer | latest | OTP email delivery (Gmail SMTP) |
| @google/generative-ai | latest | Google Gemini AI SDK |
| Cloudflare Workers AI | — | AI fallback provider |
| Tesseract.js | latest | Local OCR (last-resort fallback) |
| pdf-parse | latest | Digital PDF text extraction |
| pdf-poppler | latest | PDF-to-image for scanned PDF OCR |
| mammoth | latest | Word (.docx) text extraction |
| ExcelJS | latest | Excel (.xlsx) text extraction |
| officeparser | latest | PowerPoint (.pptx) text extraction |
| fluent-ffmpeg + ffmpeg-static | latest | Video-to-audio extraction |
| sharp | latest | Image resizing/compression |
| adm-zip | latest | ZIP inspection (scanned DOCX) |
| nodemon | latest | Dev auto-restart |

---

## Source — Frontend (`src/`)

### Entry Points

| File | Purpose |
|---|---|
| `main.jsx` | React DOM root — renders `<App />` into `#root` |
| `App.jsx` | Monolithic main component (~360KB) — all routing, session management, role-based UI, and portal switching |
| `index.css` | Global styles — Tailwind directives, body defaults |

---

### Pages (`src/pages/`)

| File | Route | Description |
|---|---|---|
| Landing / Login | `/` | Public landing page, login, and signup forms with OTP verification |
| College Portal | `/dashboard` | Role-aware dashboard — renders student / faculty / admin view based on session role |
| IT Portal | `/it-admin` | Separate IT admin login and management panel |

> Note: Due to the monolithic `App.jsx` architecture, most page-level logic lives directly in that file. The `pages/` directory contains supporting page components.

---

### Components (`src/components/`)

#### Shared UI

| File | Description |
|---|---|
| Navbar / Sidebar | Navigation components with role-aware menu items and mobile responsiveness |
| ThemeToggle | Dark/light mode toggle |
| Modal / Drawer | Reusable overlay components used across all modules |
| LoadingSpinner | Global loading state indicator |

#### AI Chat Panel

| File | Description |
|---|---|
| `AIChatPanel` | Floating AI assistant panel — chat history, file upload input, mode selector (default / tutor / mindmap) |
| `MermaidDiagram` | Detects `:::MERMAID_Start:::` tags in AI response and renders an interactive Mermaid.js flowchart |
| `MarkdownRenderer` | Renders AI text responses using `react-markdown` with code block and table support |

#### LMS Components

| File | Description |
|---|---|
| `ClassroomView` | Module/chapter tree for a classroom; shows student progress per content item |
| `ContentPlayer` | Unified content viewer — handles PDF (react-pdf), YouTube (react-player), and stored video |
| `ModuleManager` | Faculty interface to create/edit modules and upload content |

#### Exam / COE Components

| File | Description |
|---|---|
| `ExamFormWizard` | Student exam form submission — shows eligible subjects (regular + backlog), confirms fees |
| `MarksUploader` | Faculty/admin bulk marks entry per subject per student |
| `ResultCard` | Student result display per exam session |
| `AdmitCardPDF` | Generates downloadable admit card PDF using jsPDF + AutoTable |
| `QuestionBankViewer` | Displays uploaded previous year papers with in-browser PDF preview |

#### Library Components

| File | Description |
|---|---|
| `DigitalLibrary` | Resource listing with approval status, faculty upload flow, admin approve/reject |
| `PhysicalBookManager` | Admin interface — book inventory, copy-level status, checkout/return workflow |
| `BookCard` | Individual book display with QR code and barcode generated via react-qrcode and react-barcode |
| `UserLookup` | Search user by email, UID, roll number, or employee ID for checkout |

#### Attendance Components

| File | Description |
|---|---|
| `AttendanceMarker` | Period-wise Present/Absent/Late marking grid for a batch on a selected date |
| `AttendanceReport` | Student attendance percentage view per subject |

#### Admin Components

| File | Description |
|---|---|
| `UserManagementTable` | Lists all students, faculty, and admins with filters; supports account approval |
| `BatchManager` | Create and manage student batches; set current semester/term |
| `DepartmentManager` | CRUD for departments with stream configuration |
| `FeatureTogglePanel` | IT Admin UI — toggle features ON/OFF per role per college |
| `CollegeManager` | IT Admin UI — create, edit, suspend, and delete colleges |

#### Misc Components

| File | Description |
|---|---|
| `NoticeBoard` | List and create notices; filtered by role (student notices vs staff notices) |
| `LeaveApplication` | Faculty leave application form + admin approval panel |
| `RoutineViewer` | Weekly timetable viewer for students and faculty |

---

### Context (`src/context/`)

| File | Description |
|---|---|
| `AuthContext.jsx` | Global auth state — session token, user object, tenant, role. Persists token in `localStorage`. Auto-verifies on page reload via `GET /session/verify-token` |
| `ThemeContext.jsx` | Dark/light theme state — persists preference to `localStorage`, applies class to `<html>` |

---

### Hooks (`src/hooks/`)

| File | Used By | Description |
|---|---|---|
| `useAuth.js` | All protected components | Returns current user, role, tenant from `AuthContext` |
| `useFeatureFlags.js` | Dashboard, sidebar | Reads `SystemConfig` from backend to determine which features to show per role |
| `useFileUpload.js` | AI panel, LMS uploader | Handles file selection, preview, and Axios multipart upload with progress |

---

### Utils (`src/utils/`)

| File | Description |
|---|---|
| `api.js` | Axios instance pre-configured with base URL and `Authorization` header injection from session token |
| `format.js` | Date formatting, number formatting, and UID display helpers |
| `pdfExport.js` | jsPDF wrappers for admit cards, library book cards, and exam reports |
| `mermaidParser.js` | Detects and extracts Mermaid code blocks from AI responses before passing to `MermaidDiagram` |

---

## Source — Backend (`backend/`)

### Entry Point

| File | Purpose |
|---|---|
| `server.js` | Express app — mounts all 16 route files, serves static `webdata/`, starts scheduled cleanup jobs (hourly), listens on port 4000 |

---

### Config (`backend/config/`)

| File | Description |
|---|---|
| `db.js` | MongoDB Atlas connection via Mongoose |
| `masterFeatures.js` | Source-of-truth feature list per role — IT admins toggle these per college in `SystemConfig` |
| `systemRoles.js` | Role constant definitions (`student`, `faculty`, `college_admin`, `it_user`, `it_admin`) |

---

### Middleware (`backend/middleware/`)

| File | Description |
|---|---|
| `authMiddleware.js` | Two exported middlewares: `setTenantContext` (college portal — validates session, injects `req.user`, `req.tenant`, `req.role`) and `setITContext` (IT portal — checks role is `it_admin` or `it_user`) |

---

### Routes (`backend/routes/`)

| File | Prefix | Description |
|---|---|---|
| `authRoutes.js` | `/api/auth` | Full auth lifecycle: email check, OTP send/verify, role-based signup (User + Membership + Profile), signin (JWT + Session), signout, token verify, public college list |
| `aiRoutes.js` | `/api/ai` | AI chat (default/tutor/mindmap modes), file summarize (any format), lecture video transcription; dual Gemini + Cloudflare strategy |
| `lmsRoutes.js` | `/api` | Classroom modules and content management; student progress tracking; faculty file uploads |
| `coeRoutes.js` | `/api/coe` | Exam sessions, student eligibility, form submission, marks upload, result publishing, question bank, student-subject allocation |
| `libraryRoutes.js` | `/api/library` | Digital resource CRUD with approval flow; physical book inventory with copy-level checkout/return/removal |
| `attendanceRoutes.js` | `/api/attendance` | Attendance initialization per batch+date, period-wise marking, backdated support |
| `timetableRoutes.js` | `/api` | Weekly routine builder, lesson plan, academic calendar events |
| `noticeRoutes.js` | `/api/notices` | Notice CRUD — role-filtered, tenant-scoped |
| `leaveRoutes.js` | `/api/leave` | Faculty leave application; admin approve/reject |
| `departmentRoutes.js` | `/api/departments` | Department CRUD with stream config |
| `classroomRoutes.js` | `/api/classrooms` | Virtual classroom management; enroll/unenroll students |
| `batchRoutes.js` | `/api/batches` | Batch CRUD; current term/semester tracking |
| `collegeAdminRoutes.js` | `/api/college-admin` | College-level user management, profile approvals |
| `itAdminRoutes.js` | `/it-admin` | IT system administration: college lifecycle, feature manager, IT user management, request handling |
| `sessionRoutes.js` | `/session` | Session info lookup — returns user + tenant details from a session token |
| `systemRoutes.js` | `/` | Health check endpoint |

---

### Models (`backend/models/`) — 33 Mongoose Collections

| Model | Purpose |
|---|---|
| `User` | Core user (email, hashed password) |
| `Tenant` | College entity (name, code, logo, status) |
| `Membership` | User ↔ Tenant ↔ Role link |
| `Session` | Active login sessions (token + expiry + lastActivity) |
| `EmailVerification` | OTP codes (10-min TTL, auto-cleaned hourly) |
| `StudentProfile` | Roll number, UID, batch, semester, department |
| `FacultyProfile` | Employee ID, department, designation |
| `AdminProfile` | College admin profile details |
| `ITUserProfile` | IT manager profile |
| `ITAdminProfile` | IT admin profile |
| `Department` | College departments with streams |
| `Subject` | Subject code, credits, semester, type (regular/backlog) |
| `Batch` | Student batch — year, current term, department link |
| `Classroom` | Virtual classroom entity |
| `ClassModule` | Chapter/unit within a classroom |
| `ClassContent` | Content item (file, link, video) per module |
| `ContentProgress` | Student completion state per content item |
| `Routine` | Weekly class routine (day → periods → subject/faculty) |
| `Attendance` | Records per batch + period + date (upserted) |
| `ExamSession` | Exam session (name, cycle Odd/Even, fees, status) |
| `StudentExamForm` | Submitted form per student per session (subjects selected) |
| `ExamResult` | Marks per student per subject per session |
| `QuestionBank` | Uploaded question paper files |
| `StudentSubjectMap` | Admin-defined subject allocation per student per semester |
| `Notice` | Notice board entries — role-filtered, tenant-scoped |
| `LeaveApplication` | Faculty leave requests with status |
| `LibraryCredential` | Library admin access credentials |
| `DigitalResource` | External resource links with approval status |
| `PhysicalBook` | Physical book with embedded copy array (copyId, status, issuedTo snapshot) |
| `SystemConfig` | Per-tenant feature flag map (role → features ON/OFF) |
| `CollegeAdminRequest` | Requests to onboard college admin accounts |
| `NoteloomManagerRequest` | Requests to onboard IT manager accounts |
| `Counter` | Auto-increment utility (used for college code generation from 1001) |

---

### Services (`backend/services/`)

| File | Description |
|---|---|
| `LocalOCR.js` | Thin Tesseract.js wrapper — accepts an image buffer, runs English OCR locally, returns extracted text. Used as last-resort fallback when all cloud AI fails |

---

### Utils (`backend/utils/`)

| File | Description |
|---|---|
| `userDTO.js` | Strips sensitive fields (password hash, internal IDs) from user objects before sending to the frontend |

---

### Scripts (`backend/scripts/`)

| File | Description |
|---|---|
| `seed.js` | Database seeder — creates initial IT admin account and a demo college tenant for local development |

---

### Storage

```
webdata/
└── uploads/
    ├── classrooms/     # LMS content files and classroom lecture videos
    ├── profiles/       # Profile pictures (overflow from Supabase)
    ├── library/        # Digital library uploaded files
    └── questionbank/   # COE question paper uploads

temp/                   # Temporary files during AI processing (auto-cleaned after response)
```

---

## Data Flow

```
User clicks an action in the React UI (e.g., "Mark Attendance")
        │
        ▼
  Axios (src/utils/api.js)
        │  Authorization: Bearer <sessionToken>
        ▼
  Express Route Handler (e.g., attendanceRoutes.js)
        │
        ├─ setTenantContext middleware
        │    ├─ Session.findOne(token) → checks expiry
        │    ├─ Populates req.user, req.tenant, req.role
        │    └─ Updates session.lastActivity
        │
        ├─ Route handler runs DB query scoped to req.tenant.id
        │    └─ Only returns data belonging to that college
        │
        └─ Response → React updates UI

AI Feature Flow
        │
        ▼
  POST /api/ai/summarize-file  OR  /api/ai/chat
        │
        ├─ Try Google Gemini 2.5 Flash Lite (primary)
        │    └─ On 429/503: retry up to 3×, 4s delay
        │
        ├─ FAIL → Try Cloudflare Workers AI (Llama 3 / Whisper)
        │
        ├─ Scanned doc → pdf-poppler or adm-zip → Tesseract.js local OCR
        │
        └─ Video lecture → FFmpeg audio extract → Whisper → Llama 3 summary
                │
                ▼
        Response → React renders Markdown or Mermaid diagram
```

---

## Role System

| Role (DB) | Frontend Label | Portal | Access |
|---|---|---|---|
| `student` | Student | College | LMS, exams, attendance view, library |
| `faculty` | Faculty | College | Content upload, attendance marking, leave |
| `college_admin` | College Admin | College | Full college management |
| `it_user` | Noteloom Manager | IT | Limited IT operations |
| `it_admin` | Noteloom Admin | IT | Full system control |

Features visible per role are controlled by `masterFeatures.js` + `SystemConfig` (per-tenant DB config). IT Admin can toggle any feature for any role in any college at runtime — no code deployment required.

---

## Deployment

```
Frontend → Vercel (static SPA)
  npm run build → dist/
  vercel.json handles SPA catch-all routing

Backend → Railway / Render / VPS (Node.js)
  node backend/server.js
  All env vars must be set in host dashboard

Database → MongoDB Atlas (cloud, no self-hosting needed)
Static files → webdata/ served by Express static middleware
```

---

*Last updated: May 2026 · Version V1.0.43*
