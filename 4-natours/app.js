const express = require('express');
const fs = require('fs');

const app = express();

// Middlewares
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post this endpoimnt...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  //if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  const index = tours.findIndex((el) => el.id === id);
  const updatedTour = {
    ...tour,
    ...req.body,
  };
  tours[index] = updatedTour;

  await fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        message: 'Tour Updated',
        data: {
          updatedTour,
        },
      });
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`App running on port ${PORT}.`);
});
