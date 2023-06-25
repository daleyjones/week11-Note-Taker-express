const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
const feedbackRouter = require('./notes');
// Import the diagnostics route
const diagnosticsRouter = require('./diagnostics');

const app = express();

app.use('/api/notes', notesRouter);
app.use('/feedback', feedbackRouter);
// Initialize diagnostics route
app.use('/diagnostics', diagnosticsRouter);

module.exports = app;
