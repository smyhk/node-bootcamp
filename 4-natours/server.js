const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`App running on port ${PORT}.`);
});
