const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1 - not efficient for production
  // fs.readFile('test-file.txt', (err, data) => {
  //  if (err) console.error(err);
  //   res.end(data);
  // });

  // Solution 2 - Streams - back pressure
  // const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.error(err);
  //   res.statusCode = 500;
  //   res.end('file not found');
  // });

  // Solution 3 - Pipes to writable
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
