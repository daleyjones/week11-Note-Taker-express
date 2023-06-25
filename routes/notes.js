const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const notesFilePath = path.join(__dirname, 'notes.json');


function readNotes() {
  try {
    const notesData = fs.readFileSync(notesFilePath, 'utf8');
    return JSON.parse(notesData);
  } catch (error) {
    console.error('Error reading notes file:', error);
    return [];
  }
}


function writeNotes(notes) {
  try {
    fs.writeFileSync(notesFilePath, JSON.stringify(notes), 'utf8');
  } catch (error) {
    console.error('Error writing notes file:', error);
  }
}

router.get('/', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now().toString(), title, content };
  const notes = readNotes();
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

router.get('/:id', (req, res) => {
  const noteId = req.params.id;
  const notes = readNotes();
  const note = notes.find((note) => note.id === noteId);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

router.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  let notes = readNotes();
  const index = notes.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    const deletedNote = notes.splice(index, 1)[0];
    writeNotes(notes);
    res.json(deletedNote);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

module.exports = router;
