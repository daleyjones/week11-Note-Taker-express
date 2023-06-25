const express = require('express');
const router = express.Router();


let notes = [
  { id: 1, title: 'Note 1', content: 'This is note 1' },
  { id: 2, title: 'Note 2', content: 'This is note 2' },
];


router.get('/', (req, res) => {
  res.json(notes);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});


router.get('/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find((note) => note.id === noteId);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});


router.delete('/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex((note) => note.id === noteId);
  if (index !== -1) {
    const deletedNote = notes.splice(index, 1)[0];
    res.json(deletedNote);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

module.exports = router;
