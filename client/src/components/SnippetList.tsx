import type { Snippet } from "../types"

import { MessageSquareCheck, Mailbox, Trash } from 'lucide-react';

interface SnippetListProps {
  snippets: Snippet[]
  onDelete: (id: number) => void
  onEdit: (snippet: Snippet) => void
}

function SnippetList({ snippets, onDelete, onEdit }: SnippetListProps) {
  return (
    <div className="p-6">
      <h2 className="flex items-center justify-center gap-2 text-accent-yellow font-medium mb-4 text-xl"><Mailbox /> Your Snippets</h2>
      {snippets.map(snippet => (
        <div key={snippet.id} className="bg-bg-card border border-accent-lavender rounded-lg p-4 mb-4">
          <MessageSquareCheck className="text-accent-mint mb-2" />
          <h2 className="text-accent-mint text-lg font-medium">{snippet.title}</h2>
          <p className="text-accent-lavender text-sm mt-1">{snippet.type}</p>
          <pre className=" bg-bg-primary text-accent-yellow rounded p-3 mt-3 text-sm overflow-auto">
            {snippet.content}
          </pre>
          <div className="flex justify-center">
            <button className="mt-3 bg-accent-mint text-bg-primary border border-accent-lavender rounded hover:bg-accent-lavender hover:text-text-primary px-3 py-1 text-sm" onClick={() => onEdit(snippet)}>
              Edit
            </button>
            <button className="flex items-center gap-2 mt-3 ml-2 bg-accent-coral text-bg-primary border border-accent-lavender rounded hover:bg-accent-lavender hover:text-text-primary px-3 py-1 text-sm" onClick={() => onDelete(snippet.id)}>
              <Trash /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SnippetList