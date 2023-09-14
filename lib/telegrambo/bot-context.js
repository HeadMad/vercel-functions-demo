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

    } else if (!eventMatch || eventMatch.includes(matchSeparator)) {
      const matchChain = eventMatch.split(matchSeparator);
      eventName = matchChain[0] || null;
      eventHandler = createMatchHandler(matchChain, eventHandler);

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


  function createMatchHandler(matchChain, matchEventHandler) {
    return (eventContext, eventName, parentMatch) => {
      let match = parentMatch ?? eventContext.update;
      const regExpr = /^\/(.+)\/([imus]{0,4})?$/;

      for (let p = 0; p < matchChain.length; p++) {
        const prop = matchChain[p];

        const matchType = match.constructor.name;

        if (matchType === 'Object') {
          if (prop in match)
            match = match[prop];

          else if (prop !== '')
            return null;

        } else if (matchType === 'Array') {
          const slicedMatchChain = matchChain.slice(p);
          console.log(slicedMatchChain)
          const result = match.map(match => createMatchHandler(
            slicedMatchChain,
            matchEventHandler
            )(eventContext, eventName, match)
          );
          return result.filter(res => res).flat();

        } else if (prop === '') {
          continue;

        } else if (regExpr.test(prop)) {
          const [_, pattern, flags] = prop.match(regExpr);
          const RE = new RegExp(pattern, flags);
          if (!RE.test(match))
            return null;

        } else if (String(match) != prop) {
          return null;
        } // if match !== prop
      } // for prop in props
      return matchEventHandler(eventContext, eventName, match);
    }
  }


  function runEventHandlers(trigger, eventName, eventPayload) {
    const result = [];
    if (EVENTS.has(trigger)) {
      const eventContext = EventContext(request, eventName, eventPayload);
      for (let handler of EVENTS.get(trigger))
        result.push(handler(eventContext, eventName));
    }

    return result.flat();
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