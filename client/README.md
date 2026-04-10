# ✂️ SnippetBox

A full-stack web application for saving and organizing code snippets, text notes, and links. Built with React, TypeScript, Node.js, Express, and SQLite.

🔗 **Live demo**: [snippetbox-nine.vercel.app](https://snippetbox-nine.vercel.app)

---

## Features

- Create, edit, and delete snippets
- Three snippet types: code, text, and link
- Instant search by title, content, or type
- Retro neon pastel UI with pixel art typography
- Fully responsive layout
- Persistent storage with SQLite

---

## Tech Stack

**Frontend**
- React 19 with TypeScript
- Tailwind CSS v4
- Vite
- Lucide React (icons)
- Press Start 2P (Google Fonts)

**Backend**
- Node.js + Express 5
- better-sqlite3
- CORS

**Deployment**
- Frontend → Vercel
- Backend → Render

---

## Project Structure

```
snippetbox/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SnippetForm.tsx
│   │   │   └── SnippetList.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── App.tsx
│   └── vite.config.ts
│
└── server/                  # Node.js backend
    ├── routes/
    │   └── snippets.js
    ├── db.js
    └── server.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/snippets` | Get all snippets |
| POST | `/api/snippets` | Create a new snippet |
| PUT | `/api/snippets/:id` | Update a snippet |
| DELETE | `/api/snippets/:id` | Delete a snippet |
| GET | `/api/health` | Health check |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/LuValcke/snippetbox.git
cd snippetbox
```

Install and run the backend:

```bash
cd server
npm install
npm run dev
```

Install and run the frontend (in a new terminal):

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in the `client/` folder for local development:

```
VITE_API_URL=http://localhost:3001
```

For production, set `VITE_API_URL` to your Render backend URL in your Vercel project settings.

---

## Author

**Lu Valcke** — [github.com/LuValcke](https://github.com/LuValcke)