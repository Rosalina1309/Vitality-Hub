// import axios from 'axios';
// import cheerio from 'cheerio';

// const rootUrl = `http://localhost:3001/`;

// export async function getCSRFToken(): Promise<string> {
//   try {
//     const response = await axios.get(rootUrl);
//     const data = response.data;

//     const $ = cheerio.load(data);
//     const csrfToken = $('meta[name="csrf-token"]').attr('content');

//     if (csrfToken) {
//       console.log('CSRF Token:', csrfToken);
//       return csrfToken;
//     } else {
//       throw new Error('CSRF Token not found in the response content.');
//     }
//   } catch (err) {
//     throw err;
//   }
// }


import axios from 'axios';

const rootUrl = `http://localhost:3001/`;

export async function getCSRFToken(): Promise<string> {
  try {
    const response = await axios.get(rootUrl);
    const data = response.data;

    const tokenPattern = /<meta name="csrf-token" content="(.+?)" \/>/;
    const match = data.match(tokenPattern);

    if (match && match[1]) {
      const csrfToken = match[1];
      console.log('CSRF Token:', csrfToken);
      return csrfToken;
    } else {
      throw new Error('CSRF Token not found in the response content.');
    }
  } catch (err) {
    throw err;
  }
}
