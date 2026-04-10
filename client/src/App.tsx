import { useEffect, useState } from 'react'

import type { Snippet } from "./types"
import SnippetList from "./components/SnippetList"
import SnippetForm from "./components/SnippetForm"

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [snippetToEdit, setSnippetToEdit] = useState<Snippet | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

function fetchSnippets() {
  fetch('/api/snippets')
    .then(res => res.json())
    .then(data => setSnippets(data))
}

function deleteSnippet(id: number) {
  fetch(`/api/snippets/${id}`, { method: 'DELETE' })
    .then(res => {
      if (res.ok) {
        setSnippets(prev => prev.filter(s => s.id !== id))
      } else {
        console.error('Failed to delete snippet')
      }
    })
    .catch(err => console.error('Error deleting snippet:', err))
}

const filteredSnippets = snippets.filter(s =>
  !searchQuery ||
  s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  s.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
  s.type.toLowerCase().includes(searchQuery.toLowerCase())
)

useEffect(() => {
  fetchSnippets()
}, [])

  return (
    <div className="min-h-screen bg-bg-primary max-w-6xl mx-auto p-6">
      <h1 className="font-retro text-4xl text-center pt-10 pb-6 text-accent-mint retro-title">Snippet Box</h1>
      <input
        type="text"
        placeholder="Search snippets..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-accent-lavender rounded bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-mint"
      />
      <div className="grid grid-cols-2 gap-6">
        <SnippetForm onSnippetSaved={fetchSnippets} editData={snippetToEdit} setEditData={setSnippetToEdit} />
        <SnippetList snippets={filteredSnippets} onDelete={deleteSnippet} onEdit={setSnippetToEdit} />
      </div>
    </div>
  )
}

export default App