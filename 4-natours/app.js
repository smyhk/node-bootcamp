const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post this endpoimnt...');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`App running on port ${PORT}.`);
});
