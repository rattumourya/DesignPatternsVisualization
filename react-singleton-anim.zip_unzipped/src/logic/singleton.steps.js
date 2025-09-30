export const singletonSteps = [
  {
    id: "1",
    caption: "Client A calls getInstance()",
    code: { lineRanges: [[6,6]] },
    diagram: {
      pulseNodes: ["ClientA"],
      edges: [{ from: "ClientA", to: "SingletonClass", label: "getInstance()" }]
    },
    ms: 1200
  },
  {
    id: "2",
    caption: "First null-check (instance == null)",
    code: { lineRanges: [[7,7]] },
    diagram: {
      glowNodes: ["SingletonField"],
      annotate: [{ nodeId: "SingletonField", text: "null ✅" }]
    },
    ms: 1100
  },
  {
    id: "3",
    caption: "Acquire monitor lock",
    code: { lineRanges: [[8,8]] },
    diagram: {
      pulseNodes: ["Monitor"],
      badges: [{ nodeId: "Monitor", text: "locked" }]
    },
    ms: 1000
  },
  {
    id: "4",
    caption: "Second check & create instance",
    code: { lineRanges: [[9,11]] },
    diagram: {
      spawnNodes: [{ id: "SingletonInstance", type: "instance" }],
      pulseNodes: ["SingletonInstance"]
    },
    ms: 1300
  },
  {
    id: "5",
    caption: "Return the same instance",
    code: { lineRanges: [[13,13]] },
    diagram: {
      edges: [{ from: "SingletonClass", to: "ClientA", label: "instance" }],
      pulseNodes: ["SingletonInstance"]
    },
    ms: 1000
  },
  {
    id: "6",
    caption: "Client B calls getInstance() → reuse",
    code: { lineRanges: [[6,6]] },
    diagram: {
      edges: [{ from: "ClientB", to: "SingletonClass", label: "getInstance()" },
              { from: "SingletonClass", to: "ClientB", label: "same instance" }],
      pulseNodes: ["SingletonInstance"]
    },
    ms: 1200
  }
]
