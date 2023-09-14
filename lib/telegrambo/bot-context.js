import EventContext from './event-context.js';
import { BotContextError } from './errors.js';

export default function (request) {
  const EVENTS = new Map();
  const matchSeparator = '::';

  const self = {};

  self.on = (eventMatch, eventHandler) => {
    let eventName;

    if (typeof eventMatch === 'function') {
      eventHandler = eventMatch;
      eventName = null;

    } else if (eventMatch.indexOf(matchSeparator) !== -1) {
      eventName = eventMatch.substring(0, eventMatch.indexOf(matchSeparator)) || null;
      eventHandler = createMatchHandler(eventMatch, eventHandler);

    } else {
      eventName = eventMatch;
    }

    if (EVENTS.has(eventName))
      EVENTS.get(eventName).push(eventHandler);
    else
      EVENTS.set(eventName, [eventHandler]);
  };

  self.process = (eventPayload) => {
    const eventName = Object.keys(eventPayload).find(key => key !== 'update_id');
    const handlers = [
      ...runEventHandlers(eventName, eventName, eventPayload),
      ...runEventHandlers(null, eventName, eventPayload)
    ];
    return handlers;
  };

  function createMatchHandler(eventMatch, eventHandler) {
    const props = eventMatch.split(matchSeparator);
    return (eventContext, eventName) => {
      let match = eventContext.update;
      const regExpr = /^\/(.+)\/([imus]{0,4})?$/;

      for (let prop of props) {
        const matchType = match.constructor.name;
        if (matchType === 'Object') {
          if (prop in match)
          match = match[prop];
        
        else
        return null;
      
    } else if (matchType === 'Array') {
      // TODO
      
    } else {
      let ppp = globalThis[matchType](prop);
      if (match != prop) {
            if (regExpr.test(prop)) {
              const [_, pattern, flags] = prop.match(regExpr);
              const RE = new RegExp(pattern, flags);
              console.log({pattern, flags, RE, match});
              if (!RE.test(match))
                return null;

            } else if (String(match) != prop)
              return null;

          } // if match !== prop
        } // if match not Object and Array
      } // for prop in props
      return eventHandler(eventContext, eventName, match);
    }
  }

  function runEventHandlers(trigger, eventName, eventPayload) {
    const result = [];
    if (EVENTS.has(trigger)) {
      const eventContext = EventContext(request, eventName, eventPayload);
      for (let handler of EVENTS.get(trigger))
        result.push(handler(eventContext, eventName));
    }

    return result;
  }


  return new Proxy(self, {
    get(target, prop) {
      if (prop in target)
        return target[prop];

      return (requestPayload = {}) => request(prop, requestPayload);
    },

    set(target, prop, value) {
      if (prop in target)
        throw new BotContextError(`Can't rewrite method "${prop}"`);

      if (typeof prop !== 'function')
        throw new BotContextError(`New method "${prop}" must be a function`);

      target[prop] = value;
      return true;
    },

    apply(target, thisArg, args) {
      return target.process(...args);
    }
  });
}