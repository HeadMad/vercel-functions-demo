import fetch from "node-fetch";
import RequestPayloadPrepare from "./request-payload-prepare.js";
import { ResponseError } from "./errors.js";

export default function(token) {
  return (method, payload) => {
    method = payload.method ?? method;
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const preparedPaylod = RequestPayloadPrepare(payload);
    const options = {
      method: 'POST',
      body: JSON.stringify(preparedPaylod),
      headers: { 'Content-Type': 'application/json' },
    };
    console.log(preparedPaylod);
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.ok)
          resolve(result.result);
        
        return reject(new ResponseError(result.error_code, result.description));
    });
  }
}