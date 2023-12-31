const express = require('express');
const path = require('path');
const api = require("./routes/notes");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use("/api/notes", api);

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// GET Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
