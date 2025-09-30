# Design Patterns Visualization — Singleton Animator

A Vite-powered React experience that **animates the execution of the classic double-checked locking Singleton pattern**. The app keeps a Java source view, a React Flow diagram, and player controls in sync so viewers can follow how the shared instance is created and reused over time.

## ✨ Features
- **Step-by-step playback** orchestrated by `App.jsx`, including timed auto-advance, manual prev/next controls, and captions for each moment in the walkthrough.
- **Read-only Monaco code pane** that highlights the current line ranges in `src/assets/singleton.java` and recenters the editor so the active snippet stays visible.
- **React Flow diagram** that pulses clients, glows shared state, and animates edges to mirror the interactions defined per step, with Framer Motion overlays supplying the pulse effect.
- **Transport controls** for pausing or scrubbing through the visualization, rendered via `PlayerBar.jsx`.

## 🧠 How it works
1. **Step definitions** live in `src/logic/singleton.steps.js`. Each step contains:
   - `caption`: descriptive text displayed above the code pane.
   - `code.lineRanges`: tuples indicating which lines of `src/assets/singleton.java` to highlight.
   - `diagram`: directives for the visualization (edges, `pulseNodes`, `glowNodes`, optional metadata for future extensions such as `annotate`, `badges`, and `spawnNodes`).
2. `App.jsx` stores the current step index and play state. It sets timers to auto-advance (default 1.2s per step, overridable via `ms`) and wires the player controls.
3. `PatternDiagram.jsx` seeds a base graph of clients, the singleton class, backing field, and monitor. On every step it updates edges and applies glow/pulse effects; additional metadata hooks exist for annotations and spawned nodes if you want to extend the visualization.
4. Styling in `src/index.css` delivers the two-pane layout, Monaco highlight treatment, and floating player bar aesthetics.

## 📂 Key files
| Path | Purpose |
| --- | --- |
| `src/App.jsx` | Central orchestrator for playback, wiring code and diagram views. |
| `src/components/CodePane.jsx` | Monaco wrapper that renders highlighted Java code snippets. |
| `src/components/PatternDiagram.jsx` | React Flow canvas plus Framer Motion overlays for pulses/glow. |
| `src/components/PlayerBar.jsx` | Playback control buttons for prev/play/pause/next. |
| `src/logic/singleton.steps.js` | Step-by-step script describing code highlights and diagram actions. |
| `src/assets/singleton.java` | Java double-checked locking singleton example that’s highlighted in the UI. |

## 🛠 Customization tips
- Swap in a different pattern by replacing the Java snippet and crafting a new `*.steps.js` definition with matching line ranges and diagram directives.
- Extend `PatternDiagram.jsx` to render metadata like `annotate`, `badges`, or dynamically spawned nodes described in the step model.
- Adjust animation timings per step via the optional `ms` property in each step.

## 🚀 Development
```bash
npm install
npm run dev
# open the Vite dev server URL (defaults to http://localhost:5173)
```

## 📦 Production build
```bash
npm run build
npm run preview
```

## 📚 Inspiration
This project focuses on the Singleton pattern, but the structure can be reused for other design pattern walkthroughs by swapping the assets and step definitions.
