const app = require('./app');

console.log(process.env);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.info(`App running on port ${PORT}.`);
});
