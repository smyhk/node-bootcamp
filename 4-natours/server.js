const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//.then(() => console.log('DB connnection successful'));

// Start server
const PORT = process.env.PORT || 3000;
mongoose.connection.once('open', async () => {
  await app.listen(PORT, () => {
    console.info(`App running on port ${PORT}.`);
  });
  console.log('DB connnection successful');
});
