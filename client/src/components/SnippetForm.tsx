import React, { useState } from 'react'

import { Save, CirclePlus, Pencil } from 'lucide-react';
import type { Snippet } from '../types';

type SnippetForm = {
  title: string
  content: string
  type: string
}

function SnippetForm({ onSnippetSaved, editData, setEditData }: { onSnippetSaved: () => void; editData: Snippet | null; setEditData: (snippet: Snippet | null) => void }) {
  const [snippetForm, setsnippetForm] = useState<SnippetForm>({ title: '', content: '', type: '' })

  React.useEffect(() => {
    if (editData) {
      setsnippetForm(editData)
    }
  }, [editData])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (editData) {
      fetch(`/api/snippets/${editData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snippetForm),
      })
        .then(res => res.json())
        .then(data => {
          onSnippetSaved()
          setsnippetForm({ title: '', content: '', type: '' })
          setEditData(null)
          console.log('Snippet updated:', data)
        })
        .catch(err => {
          console.error('Error updating snippet:', err)
        })
      return
    }
    fetch('/api/snippets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snippetForm),
    })
      .then(res => res.json())
      .then(data => {
        onSnippetSaved()
        setsnippetForm({ title: '', content: '', type: '' })
        console.log('Snippet saved:', data)
      })
      .catch(err => {
        console.error('Error saving snippet:', err)
      })
  }

  return (
    <div className="p-6">
    <form onSubmit={handleSubmit} className="p-6 bg-bg-secondary border border-accent-coral rounded-lg self-start">
      <h2 className="flex items-center justify-center text-accent-mint text-lg font-medium mb-2"> {editData ? <><Pencil /> Edit Snippet</> : <><CirclePlus /> Add New Snippet</>} </h2>
      <div className="flex flex-col gap-3">
      <input className="bg-bg-primary p-2 border border-accent-lavender rounded text-text-primary"
        type="text"
        placeholder="Title"
        value={snippetForm.title}
        onChange={e => setsnippetForm({ ...snippetForm, title: e.target.value })}
      />
      <textarea className="bg-bg-primary p-2 border border-accent-lavender rounded text-text-primary"
        placeholder="Content"
        value={snippetForm.content}
        onChange={e => setsnippetForm({ ...snippetForm, content: e.target.value })}
      />
      <select className="bg-bg-primary p-2 border border-accent-lavender rounded text-text-primary"
        value={snippetForm.type}
        onChange={e => setsnippetForm({ ...snippetForm, type: e.target.value })}
      >
        <option value="">Select type</option>
        <option value="text">Text</option>
        <option value="code">Code</option>
        <option value="link">link</option>
      </select>
      <button className="flex items-center justify-center gap-2 bg-accent-mint text-bg-primary border border-accent-lavender rounded hover:bg-accent-lavender hover:text-text-primary" type="submit">
        {editData ? <><Pencil /> Update Snippet</> : <><Save /> Save Snippet</>}
      </button>
      </div>
    </form>
    </div>
  )
}

export default SnippetForm