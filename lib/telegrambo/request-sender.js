import fetch from "node-fetch";
import PayloadPrepare from "./payload-prepare";

export default RequestSender {
  constructor(token) {
    this.token = token;
  }
  
  request(method, updatePayload) {
    const payload = PayloadPrepare.prepare(method, updatePayload);
    return fetch(`https://api.telegram.org/bot${this.token}/${method}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// export default function(token) {
//   return (method, updatePayload) => (payload) => {
//     const method = payload.method ?? method;
//     const url = `https://api.telegram.org/bot${token}/${method}`;
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(payload),
//       headers: { 'Content-Type': 'application/json' },
//     };

//     return fetch(url, options);
//   }
// }