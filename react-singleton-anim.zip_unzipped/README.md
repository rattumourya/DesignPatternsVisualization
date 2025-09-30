# Singleton Pattern — Code + Diagram Animator (React)

A runnable React app that animates **Java code execution** in sync with a **React Flow** diagram for the Singleton pattern. 
Uses Monaco for code highlights, React Flow for nodes/edges, and Framer Motion for micro-animations.

## ✨ Tech
- React + Vite
- React Flow
- Monaco Editor (`@monaco-editor/react`)
- Framer Motion

## 🚀 Run locally
```bash
npm install
npm run dev
# open the URL shown (default http://localhost:5173)
```

## 🧠 How it works
- Steps are defined in `src/logic/singleton.steps.js`
- Each step contains:
  - `code.lineRanges`: lines to highlight in `src/assets/singleton.java`
  - `diagram`: edges to draw, nodes to pulse/glow
- `App.jsx` plays steps automatically; use the bottom controls to pause/prev/next.

## 🛠 Customize
- Replace `src/assets/singleton.java` with your Java snippet.
- Edit `src/logic/singleton.steps.js` to match new lines and diagram actions.
- Add more patterns by creating new `*.steps.js` and conditionally loading them.

## 📦 Build
```bash
npm run build
npm run preview
```

## Notes
- This demo keeps pulse overlays approximate; for pixel-perfect overlays inside the React Flow viewport, you can render custom node types with Framer Motion directly.
- If Monaco fonts look large/small, tweak `fontSize` inside `CodePane.jsx`.
