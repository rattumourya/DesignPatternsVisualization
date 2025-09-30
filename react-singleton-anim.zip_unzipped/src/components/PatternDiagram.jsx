import { useEffect, useMemo } from 'react'
import ReactFlow, { useNodesState, useEdgesState, Background } from 'reactflow'
import { motion } from 'framer-motion'
import 'reactflow/dist/style.css'

export default function PatternDiagram({ step }) {
  const initialNodes = useMemo(() => ([
    { id: 'ClientA', position: { x: 40, y: 60 }, data: { label: 'Client A' }, style: { padding: 8 }, className: 'client' },
    { id: 'ClientB', position: { x: 40, y: 180 }, data: { label: 'Client B' }, style: { padding: 8 }, className: 'client' },
    { id: 'SingletonClass', position: { x: 340, y: 120 }, data: { label: 'Singleton' }, className: 'singleton' },
    { id: 'SingletonField', position: { x: 560, y: 60 }, data: { label: 'instance : Singleton' }, className: 'field' },
    { id: 'Monitor', position: { x: 340, y: 220 }, data: { label: 'Monitor' }, style: { padding: 6 }, className: 'field' },
  ]), [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // apply edges from step
  useEffect(() => {
    if (step?.edges) {
      setEdges(step.edges.map((e, i) => ({
        id: `e${i}`, source: e.from, target: e.to, label: e.label, animated: true, style: { strokeWidth: 1.5 }
      })))
    } else {
      setEdges([])
    }
  }, [step, setEdges])

  // glow or pulse nodes
  const pulseSet = new Set(step?.pulseNodes || [])
  const glowSet = new Set(step?.glowNodes || [])

  useEffect(() => {
    setNodes(nds => nds.map(n => {
      const base = { ...n }
      base.className = (n.className || '') + (glowSet.has(n.id) ? ' glow' : '')
      return base
    }))
  }, [step, setNodes])

  return (
    <div style={{ height: 'calc(100vh - 96px)', position: 'relative' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
        <Background gap={16} size={1} />
      </ReactFlow>

      {[...pulseSet].map(id => {
        const n = nodes.find(x => x.id === id)
        if (!n) return null
        // translate node position to absolute overlay (approx; RF uses transform, but this visual pulse hint is enough)
        const x = n.position.x + 8
        const y = n.position.y + 8
        return (
          <motion.div key={'p'+id}
            style={{ position: 'absolute', left: x, top: y, width: 140, height: 42, borderRadius: 12, pointerEvents:'none' }}
            initial={{ boxShadow: '0 0 0 0 rgba(56,132,255,0.0)' }}
            animate={{ boxShadow: ['0 0 0 0 rgba(56,132,255,0.0)','0 0 0 12px rgba(56,132,255,0.12)','0 0 0 0 rgba(56,132,255,0.0)'] }}
            transition={{ duration: 0.9 }}
          />
        )
      })}
    </div>
  )
}
