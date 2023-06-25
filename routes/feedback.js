const fb = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
fb.get('/', (req, res) => {
  readFromFile('./db/feedback.json')
    .then((data) => {
      const feedbackData = JSON.parse(data);
      res.json(feedbackData);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Unable to retrieve feedback' });
    });
});

// POST Route for submitting feedback
fb.post('/', (req, res) => {
  const { email, feedbackType, feedback } = req.body;

  if (email && feedbackType && feedback) {
    const newFeedback = {
      email,
      feedbackType,
      feedback,
      feedback_id: uuidv4(),
    };

    readAndAppend('./db/feedback.json', JSON.stringify(newFeedback))
      .then(() => {
        const response = {
          status: 'success',
          body: newFeedback,
        };
        res.json(response);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Unable to submit feedback' });
      });
  } else {
    res.status(400).json({ error: 'Incomplete feedback data' });
  }
});

module.exports = fb;
