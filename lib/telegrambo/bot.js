import sendRequest from "./sendRequest";
import { BotContextError } from './errors'

/**
* Build telegram bot easy
*
* @param {string} token - Telegram bot token
* @return {proxy} - Proxy-object 
*/
export default function create(token) {
  const HANDLERS = new Map();

  const self = {};

  self.on = function (event, handler) {
    if (typeof event === 'function') {
      handler = event;
      event = null;
    }

    if (HANDLERS.has(event))
      HANDLERS.get(event).push(handler);
    else
      HANDLERS.set(event, [handler]);
  };


  self.process = function (update) {
    const event = Object.keys(update).find(key => key !== 'update_id');
    const result = [
      ...runEventHandlers(update, event, event),
      ...runEventHandlers(update, event, null),
    ];
    return result;
  };


  function runEventHandlers(update, trigger, event) {
    let result = [];

    if (HANDLERS.has(event))
      for (let handler of HANDLERS.get(event))
        result = result.concat(handler(createEventContext(update, trigger), trigger));

    return result;
  }


  function createEventContextData(eventName, update) {
    const eventData = update[eventName];
    if (ContextDataEvents.has(eventName))
      return ContextDataEvents.get(eventName)(eventData);

    return {};
  }


  function createEventContext(update, trigger) {
    const contextData = createEventContextData(trigger, update);
    return new Proxy(update, {
      get(target, prop) {
        if (prop in target)
          return target[prop];

        if (prop === 'update')
          return target;

        if (prop === 'payload')
          return contextData;

        return (payload = {}) => sendRequest({ ...contextData, ...payload }, prop)
      }
    })
  }


  function createBotContext(target = {}) {
    return new Proxy(target, {
      get(target, method) {
        if (method in target)
          return target[method];

        else
          return (payload = {}) => sendRequest(payload, method);
      },

      set(target, method, handler) {
        if (typeof handler !== 'function')
          throw new BotContextError(`New method "${method}" must be a function`);

        else if (method in target)
          throw new BotContextError(`Bot has method "${method}". Use another method name`);

        target[method] = handler;
        return true;
      }
    })
  }

 

  return createBotContext(self);
}




