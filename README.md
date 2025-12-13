# Learning Management System (LMS)

> **⚠️ BETA / ACTIVE DEVELOPMENT**
>
> This project is currently in **active development** and should be considered a **beta version**. Significant features, UI improvements, and architectural refinements are still in progress. The application is **not production-ready** at this time. Expect breaking changes, UI redesigns, and ongoing development work.

A full‑stack LMS for delivering courses, lessons, and quizzes. The project is split into a Next.js frontend and a Node.js/Express backend with Sequelize ORM.

**Highlights**

- Modern UI with Next.js 15, React 19, Tailwind CSS v4.
- Secure authentication (JWT), role‑based access (student, instructor, admin).
- Courses with ordered lessons, quizzes, options, and per‑user progress.
- Idempotent DB seeding for sample content.

## Tech Stack

- Frontend: Next.js 15, React 19, Tailwind CSS 4, Axios
- Backend: Node.js (Express), Sequelize, PostgreSQL (or compatible SQL)
- Auth: JWT with `Authorization: Bearer <token>`

## Repository Structure

- frontend/ — Next.js app (app router)
- backend/ — Express API + Sequelize models, controllers, routes
- LICENSE, README.md

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node 22)
- A SQL database (PostgreSQL recommended)

### 1) Configure environment variables (backend)

Create `backend/.env` and set values (examples):

```
PORT=5000
DATABASE_URL=postgres://user:pass@localhost:5432/lms
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
ADMIN_INVITE_CODE=some_admin_invite_secret
```

### 2) Install dependencies

```powershell
cd g:\Projects\learning-management-system-lms-pern-stack\backend
npm install

cd g:\Projects\learning-management-system-lms-pern-stack\frontend
npm install
```

### 3) Run the apps (two terminals)

```powershell
# Terminal 1 – backend
cd g:\Projects\learning-management-system-lms-pern-stack\backend
npm run dev

# Terminal 2 – frontend
cd g:\Projects\learning-management-system-lms-pern-stack\frontend
npm run dev
```

Frontend dev server: http://localhost:3000
Backend API server: http://localhost:5000

### 4) Seed sample data (backend)

Seeding creates a “JavaScript for Beginners” course with lessons, quizzes and options.

```powershell
cd g:\Projects\learning-management-system-lms-pern-stack\backend
node .\seeders\seedCourses.js
```

## Core Features

- Authentication: register/login; default role is `student` unless authorized for `admin`.
- Courses: list courses, course details with lessons and progress.
- Lessons: content pages; mark completed when quiz passed.
- Quizzes: single/multi‑option questions with scoring, per‑user attempts via `UserQuiz`.
- Progress: `UserProgress` tracks lesson completion per user.

## Key Implementation Notes

- Optional role on registration: `role` defaults to `student`; creating `admin` requires a valid `ADMIN_INVITE_CODE` or an authenticated admin requester.
- Sequelize associations:
  - `Lesson` has many `Quiz`; `Quiz` has many `Option` (aliased as `options`).
  - `UserQuiz` stores attempts `{ score, total, passed, answers[] }`.
- Quiz endpoints include options so the frontend can render `quiz.options`.

## API Overview (Backend Highlights)

- `GET /api/courses` – list courses
- `GET /api/courses/:courseId/lessons` – list lessons for a course
- `GET /api/courses/:courseId/lessons/:lessonId/quizzes` – list quizzes (with `options`)
- `GET /api/courses/:courseId/lessons/:lessonId/quizzes/:quizId` – single quiz (with `options`)
- `POST /api/courses/:courseId/lessons/:lessonId/quizzes/:quizId/submit` – submit answers, returns `{ attempt, correctOptionIds }`

## Frontend Notes

- Path aliases: set in `frontend/jsconfig.json` with `baseUrl` and `paths` to use `@/` (e.g. `@/components/ProtectedRoute`).
- Tailwind CSS v4: global directives live in your app‑level CSS; use `@layer` to define component and utility styles. No separate `tailwind.config` is mandatory, but you can extend via config if needed.

## Troubleshooting

- Multiple lockfiles warning: remove `frontend/package-lock.json` if you see Next.js warning about multiple lockfiles.
- Quiz options not showing: ensure models use alias `Quiz.hasMany(Option, { as: "options" })` and controllers include `{ model: Option, as: "options" }`.
- 500 on pages due to `@/` imports: configure `frontend/jsconfig.json` with `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }`.

## Known Limitations & Work in Progress

- **UI/UX**: The interface is functional but undergoing continuous design improvements and refinements.
- **Responsive design**: Mobile and tablet responsiveness enhancements are in progress.
- **Performance optimization**: Query optimization, caching strategies, and loading time improvements are planned.
- **Error handling & user feedback**: Additional error scenarios and user-facing feedback improvements are being implemented.
- **Test coverage**: Comprehensive unit and integration tests are not yet in place; test automation is planned for Phase 2.
- **Documentation**: API documentation and developer guides will be expanded.
- **Email notifications**: Email verification, password reset, and course enrollment notifications are planned features.

## Roadmap – Phase 2: Admin Dashboard

- User management: list/search users, assign roles, deactivate/reactivate accounts.
- Course authoring: create/edit courses, lesson builder with rich text, quiz editor.
- Analytics: course enrollments, lesson completion rates, quiz performance charts.
- Moderation: review content submissions, flag inappropriate materials.
- Settings: site‑wide configuration, email templates, access controls.
- Security: audit logs, rate limiting, password policies, email verification.

## License

See `LICENSE` for details.
