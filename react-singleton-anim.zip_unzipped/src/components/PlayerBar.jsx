export default function PlayerBar({ playing, onPlayToggle, onPrev, onNext }) {
  return (
    <div className="playerbar">
      <button onClick={onPrev}>⏮ Prev</button>
      <button onClick={onPlayToggle}>{playing ? "⏸ Pause" : "▶️ Play"}</button>
      <button onClick={onNext}>⏭ Next</button>
    </div>
  )
}
