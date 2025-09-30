import { useEffect, useRef, useState } from 'react'
import CodePane from './components/CodePane.jsx'
import PatternDiagram from './components/PatternDiagram.jsx'
import PlayerBar from './components/PlayerBar.jsx'
import { singletonSteps } from './logic/singleton.steps.js'
import code from './assets/singleton.java?raw'

export default function App() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef = useRef(null)
  const step = singletonSteps[idx]

  useEffect(() => {
    if (!playing) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setIdx(i => (i + 1) % singletonSteps.length), step.ms ?? 1200)
    return () => timerRef.current && clearTimeout(timerRef.current)
  }, [idx, playing, step])

  return (
    <div className="app-grid">
      <div className="pane left">
        <div className="caption">{step.caption}</div>
        <CodePane code={code} highlights={step.code?.lineRanges ?? []} />
      </div>
      <div className="pane">
        <PatternDiagram step={step.diagram} />
      </div>

      <PlayerBar
        playing={playing}
        onPlayToggle={() => setPlaying(p => !p)}
        onPrev={() => setIdx(i => (i - 1 + singletonSteps.length) % singletonSteps.length)}
        onNext={() => setIdx(i => (i + 1) % singletonSteps.length)}
      />
    </div>
  )
}
