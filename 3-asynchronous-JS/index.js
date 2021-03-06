const fs = require('fs');
const superagent = require('superagent');

// Define functions that return a Promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`File not found! 🤬 ${err}`);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write to file! 🤬');
      resolve('success');
    });
  });
};

// Async/await function
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    // Resolve multiple promises
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    // Store all Promises in an array; store body.message into images array
    const allPromises = await Promise.all([res1, res2, res3]);
    const images = allPromises.map((res) => res.body.message);

    console.log(images);

    await writeFilePro('dog-img.txt', images.join('\n'));
    console.log('Random dog image saved to file');
  } catch (err) {
    if (err.message) {
      console.error(err.message);
    } else {
      console.error(err);
    }

    throw err;
  }

  return '2: READY';
};

// Call function with IIFE
(async () => {
  try {
    console.info('1: Will get dog pics!!');
    console.log(await getDogPic());
    console.info('3: Done getting dog pics!');
  } catch (err) {
    console.error(err);
  }
})();

/*
console.info('1: Will get dog pics!!');
// Captures the return value of the entire async function
getDogPic()
  .then((x) => {
    console.info(x);
    console.info('3: Done getting dog pics!');
  })
  .catch((err) => {
    console.error(err);
  });
*/
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file');
  })
  .catch((err) => {
    if (err.message) {
      return console.error(err.message);
    } else {
      return console.error(err);
    }
  });
  */
