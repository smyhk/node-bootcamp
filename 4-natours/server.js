const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.info('Uncaught exception! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.info('DB connnection successful'));

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.info(`App running on port ${PORT}.`);
});

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  console.info('Unhandled rejection! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.info('Process terminated!');
  });
});
