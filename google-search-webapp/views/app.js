// app.js
const express = require('express');
const googleIt = require('google-it');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { results: null, searchQuery: '' });
});

app.post('/search', async (req, res) => {
  const searchQuery = req.body.searchQuery;

  try {
    const results = await googleIt({ 'query': searchQuery });
    res.render('index', { results, searchQuery });
  } catch (error) {
    console.error('Error:', error);
    res.render('index', { results: null, searchQuery });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
