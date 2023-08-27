
export default function (eventName, payload) {

  return new Proxy(payload, {
    get(target, prop) {
      if (prop in target)
        return target[prop];

      if (prop === 'update')
        return target;

      return request(prop, payload);
    }
  });
}