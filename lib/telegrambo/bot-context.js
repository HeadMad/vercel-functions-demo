import EventContext from 'event-context';
import {BotContextError} from './errors';

export default function(request) {
  const EVENTS = Map();

  const self = {};

  self.on = (eventName, eventHandler) => {
    if (typeof eventName === 'function') {
      eventHandler = eventName;
      eventName = null;
    }

    if (EVENTS.has(eventName))
      EVENTS[eventName].push(eventHandler);
    else
      EVENTS[eventName] = [eventHandler];
  };


  self.process = (payload) => {
    const eventName = Object.keys(payload).find(key => key !== 'update_id');
    return [
      ...runEventHandlers(eventName, eventName, payload),
      ...runEventHandlers(null, eventName, payload)
    ];
    
  };


  function runEventHandlers(trigger, eventName, payload) {
    const result = [];
    if (EVENTS.has(trigger))
      for (let handler of EVENTS.get(trigger))
        result.concat(handler(new EventContext(eventName, payload), eventName));

    return result;
  }


  return new Proxy(self, {
    get(target, prop) {
      if (prop in target)
        return target;

      return (payload = {}) => request(prop, payload);
    },

    set(target, prop, value) {
      if (prop in target)
        throw new BotContextError(`Can't rewrite method "${prop}"`);
      
      if (typeof prop !== 'function')
      throw new BotContextError(`New method "${prop}" must be a function`);

      target[prop]  = value;
      return true;
    }
  });
}