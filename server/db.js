const Database = require('better-sqlite3');

const db = new Database('snippets.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS snippets (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    title      TEXT NOT NULL,
    content    TEXT NOT NULL,
    type       TEXT DEFAULT 'text',
    tags       TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Base de datos lista');

module.exports = db;
