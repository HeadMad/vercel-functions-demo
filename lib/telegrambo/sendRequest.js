import fetch from 'node-fetch';
import { ResponseError } from './errors';
import PayloadPrepares from './payload-prepares';

export default async function (payload, method) {
  method = payload.method ?? method;
  return new Promise((resolve, reject) => {
    payload = new PayloadPrepares(payload).prepare();

    const url = `https://api.telegram.org/bot${token}/${method}`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'},
      muteHttpExceptions: true
    }).then(response => response.json());

  const result = JSON.parse(response);
  
    if (result.ok)
      return resolve(result.result);
    return reject(new ResponseError(result.error_code, result.description));
  });
  
};