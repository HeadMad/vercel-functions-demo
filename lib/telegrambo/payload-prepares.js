export default class PayloadPrepares {
  constructor(payload) {
    this.payload = { ...payload };
  }

  jsonify() {
    const jsonProps = new Set([
      'reply_markup', 'entities', 'caption_entities', 'media', 'allowed_updates',
      'allowed_updates', 'options', 'explanation_entities', 'permissions', 'results',
      'result', 'commands', 'scope', 'menu_button', 'rights', 'menu_button', 'stickers',
      'sticker', 'emoji_list', 'keywords', 'mask_position', 'results', 'button', 'prices',
      'suggested_tip_amounts', 'provider_data', 'shipping_options'
    ]);

    for (let prop in this.payload)
      if (jsonProps.has(prop))
        this.payload[prop] = JSON.stringify(this.payload[prop]);

    return this;
  }

  stringify() {
    const stringProps = new Set(['chat_id', 'from_chat_id', 'text']);

    for (let prop of stringProps)
      if (prop in this.payload)
        this.payload[prop] = String(this.payload[prop]);

    return this;
  }

  prepare() {
    this.jsonify();
    this.stringify();
    return this.payload;
  }
}