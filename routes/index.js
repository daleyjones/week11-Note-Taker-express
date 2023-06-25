const express = require('express');
const notesRouter = require('./routes/notes');

const app = express();

app.use('/api/notes', notesRouter);

module.exports = app;
