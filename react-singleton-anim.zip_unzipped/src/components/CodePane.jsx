import Editor, { useMonaco } from '@monaco-editor/react'
import { useEffect, useRef } from 'react'

export default function CodePane({ code, highlights }) {
  const monaco = useMonaco()
  const editorRef = useRef(null)

  function onMount(editor) {
    editorRef.current = editor
  }

  useEffect(() => {
    if (!editorRef.current || !monaco) return
    const editor = editorRef.current
    editor.__decorations = editor.deltaDecorations(
      editor.__decorations || [],
      (highlights || []).map(([start, end]) => ({
        range: new monaco.Range(start, 1, end, 200),
        options: { isWholeLine: true, className: 'lineHighlight' }
      }))
    )
    if (highlights && highlights[0]) {
      editor.revealLineInCenter(highlights[0][0])
    }
  }, [highlights, monaco])

  return (
    <Editor
      height="calc(100vh - 96px)"
      defaultLanguage="java"
      value={code}
      options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false }}
      onMount={onMount}
    />
  )
}
