const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/snippets — obtener todos los snippets
router.get('/', (req, res) => {
  const snippets = db.prepare('SELECT * FROM snippets ORDER BY created_at DESC').all();
  res.json(snippets);
});

// POST /api/snippets — crear un snippet nuevo
router.post('/', (req, res) => {
  const { title, content, type, tags } = req.body;
  const result = db.prepare(
    'INSERT INTO snippets (title, content, type, tags) VALUES (?, ?, ?, ?)'
  ).run(title, content, type || 'text', tags || '');
  const snippet = db.prepare('SELECT * FROM snippets WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(snippet);
});

// PUT /api/snippets/:id — editar un snippet
router.put('/:id', (req, res) => {
  const { title, content, type, tags } = req.body;
  db.prepare(
    'UPDATE snippets SET title = ?, content = ?, type = ?, tags = ? WHERE id = ?'
  ).run(title, content, type, tags, req.params.id);
  const snippet = db.prepare('SELECT * FROM snippets WHERE id = ?').get(req.params.id);
  res.json(snippet);
});

// DELETE /api/snippets/:id — eliminar un snippet
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM snippets WHERE id = ?').run(req.params.id);
  res.json({ message: 'Snippet eliminado' });
});

module.exports = router;