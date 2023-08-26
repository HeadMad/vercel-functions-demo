// import createFetch from '@vercel/fetch';
import axios from 'axios';
// const fetch = createFetch(axios);

export default async function handler(request, response) {
  const {data} = await axios('https://jsonplaceholder.typicode.com/todos/1');
  response.status(200).json(data);
}