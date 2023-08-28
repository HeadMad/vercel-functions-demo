function onEntity(bot) {
  const HANDLERS = new Map();
  
  bot.on('message', (context) => {
    const msg = context.message;
    if (!('entities' in msg) && !('caption_entities' in msg))
      return;
    let result = [];

    const runHandlers = (key, type, value) => {
      if (HANDLERS.has(key))
        for (let handler of HANDLERS.get(key))
          result = result.concat(handler(context, value, type));
    } 

    const entities = msg.entities ?? msg.caption_entities;
    const text = msg.text ?? msg.caption;
    
    for (let entity of entities) {
      const type = entity.type;
      const value = text.substr(entity.offset, entity.length);
      runHandlers(type, type, value);
      runHandlers(null, type, value);
    }
    return result;
  });
  
  return (type, handler) => {
    if (typeof type === 'function') {
      handler = type;
      type = null;
    }
    if (HANDLERS.has(type))
      HANDLERS.get(type).push(handler)
    else 
      HANDLERS.set(type, [handler]);
  };
}