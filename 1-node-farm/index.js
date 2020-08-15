const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////// FILES /////////////////////////////////
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what what we know abou the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way (in callback hell format)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('Error! 🤬');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}}`, 'utf-8', (err) => {
//         console.log('Your file has been written 🤪');
//       });
//     });
//   });
// });
// console.log('Will read file!'); // Displays before file contents

/////////////////////////// SERVER /////////////////////////////////
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  } else {
    // Status and headers must be defined before response is sent
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'You-Fucked_Up': 'haha you fucked it away!',
    });
    res.end('<h1>Page not found!</h1>');
  }

  res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.info('server is listening on port 8000');
});
