import axios from "axios";

const rootUrl = `http://localhost:3000/`;

export async function getCSRFToken(): Promise<string> {
  try {
    const response = await axios.get(rootUrl);
    const data = response.data;
    const tokenPattern = /<meta name="csrf-token" content="(.+?)" \/>/;
    const match = data.match(tokenPattern);
    if (match && match[1]) {
      const token = match[1];
      console.log('CSRF Token:', token);
      return token;
    } else {
      throw new Error('CSRF Token not found in the response content.');
    }
  } catch (err) {
    throw err;
  }
}
