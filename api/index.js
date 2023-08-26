import fetch from 'node-fetch';

export default async function handler(req, res) {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => res.json());
  console.log(data)
  res.status(200).json(data);
}