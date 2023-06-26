const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const notesFilePath = path.join(__dirname, '../db/notes.json');

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
  try {
    const notes = readNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = { id: Date.now().toString(), title, content };
    const notes = readNotes();
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const noteId = req.params.id;
    const notes = readNotes();
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
