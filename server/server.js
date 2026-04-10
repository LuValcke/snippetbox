const express = require('express');
const cors    = require('cors');
const db      = require('./db');
const snippetsRouter  = require('./routes/snippets');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/snippets', snippetsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
