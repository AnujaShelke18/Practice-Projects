# 📝 To Do App

A to-do list app built from scratch with vanilla JavaScript, HTML and CSS — no frameworks. Built as a hands-on learning project to practice DOM manipulation, state management, an MVC-style code structure, and (soon) full-stack data persistence with MongoDB.

## Features

- **Add, complete, and delete tasks**
- **Priority levels** (High / Medium / Low) per task, with a one-click sort by priority
- **Search** tasks in real time
- **Filter** by Completed / Pending
- **Settings**
  - Clear all tasks (with confirmation)
  - Set a default priority for new tasks
  - Support / FAQ panel
- **Theming** — Light, Dark, Pink, and System (follows OS preference), saved across sessions
- **Responsive, animated UI** — glass-panel cards, smooth dropdowns, task pop-in animations, and full support for reduced-motion preferences

## Tech Stack

- **HTML5 / CSS3** — custom properties (CSS variables) drive all theming
- **Vanilla JavaScript (ES Modules)** — no build step required
- **Google Fonts** — Fraunces (headings) and DM Sans (body)
- *(Coming soon)* **Node.js, Express, MongoDB (Atlas), Mongoose** for backend persistence

## Project Structure

```
BasicVersion/
├── index.html
├── style.css
├── js/
│   ├── main.js                 # entry point — initializes all controllers
│   ├── taskModel.js            # task data + logic (no DOM)
│   ├── taskView.js             # DOM rendering for tasks
│   ├── taskController.js       # task-related event listeners
│   ├── themeController.js      # theme switching logic
│   └── settingsController.js   # settings dropdown, clear-all, default priority, FAQ
└── README.md
```

This follows a lightweight **MVC pattern**:
- **Model** (`taskModel.js`) owns the task data and mutations
- **View** (`taskView.js`) owns rendering tasks to the DOM
- **Controllers** (`taskController.js`, `themeController.js`, `settingsController.js`) wire up event listeners and connect model to view

## Getting Started

Because the app uses ES Modules (`import`/`export`), it must be run through a local server — opening `index.html` directly (`file://`) will not work due to browser CORS restrictions on modules.

**Option 1 — VS Code Live Server**
1. Install the **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**

**Option 2 — `serve`**
```bash
npx serve
```
Then open the printed `http://localhost:...` URL in your browser.

## Roadmap

- [ ] Connect to MongoDB Atlas via an Express + Mongoose backend (MVC structure) for persistent storage
- [ ] Replace in-memory task array with API calls
- [ ] User accounts (login/signup) and per-user task lists — planned as a v2 feature once the database layer is in place

## Author

Made by Anuja ❤️