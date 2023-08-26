
const VALIDATIONS = new Map([
  // https://core.telegram.org/bots/api#setwebhook
  ['setWebhook', { j: ['allowed_updates'] }],

  // https://core.telegram.org/bots/api#getupdates
  ['getUpdates', { j: ['allowed_updates'] }],

  // https://core.telegram.org/bots/api#sendmessage
  ['sendMessage', { r: ['chat_id', 'text'] }],

  // https://core.telegram.org/bots/api#sendpoll
  ['sendPoll', { j: ['options', 'explanation_entities'] }],

  // https://core.telegram.org/bots/api#restrictchatmember
  ['restrictChatMember', { j: ['permissions'] }],

  // https://core.telegram.org/bots/api#setchatpermissions
  ['setChatPermissions', { j: ['permissions'] }],

  // https://core.telegram.org/bots/api#answerinlinequery
  ['answerInlineQuery', { r: ['inline_query_id', 'results'], j: ['results'] }],

  // https://core.telegram.org/bots/api#answerwebappquery
  ['answerWebAppQuery', { r: ['web_app_query_id', 'result'], j: ['result'] }],

  // https://core.telegram.org/bots/api#editmessagemedia
  ['editMessageMedia', { r: ['chat_id', 'media'] }],

  // https://core.telegram.org/bots/api#editmessagetext
  ['editMessageText', { r: ['chat_id'] }],

  // https://core.telegram.org/bots/api#sendmediagroup
  ['sendMediaGroup', { r: ['chat_id', 'media'] }],

  // https://core.telegram.org/bots/api#setmycommands
  ['setMyCommands', { j: ['commands', 'scope'] }],

  // https://core.telegram.org/bots/api#deletemycommands
  ['deleteMyCommands', { j: ['scope'] }],

  // https://core.telegram.org/bots/api#getmycommands
  ['getMyCommands', { j: ['scope'] }],

  // https://core.telegram.org/bots/api#setchatmenubutton
  ['setChatMenuButton', { j: ['menu_button'] }],

  // https://core.telegram.org/bots/api#setmydefaultadministratorrights
  ['setMyDefaultAdministratorRights', { j: ['rights'] }],

  // https://core.telegram.org/bots/api#setchatmenubutton
  ['setChatMenuButton', { r: ['chat_id', 'menu_button'], j: ['menu_button'] }],

  // https://core.telegram.org/bots/api#createnewstickerset
  ['createNewStickerSet', { j: ['stickers'] }],

  // https://core.telegram.org/bots/api#addstickertoset
  ['addStickerToSet', { j: ['sticker'] }],

  // https://core.telegram.org/bots/api#setstickeremojilist
  ['setStickerEmojiList', { j: ['emoji_list'] }],

  // https://core.telegram.org/bots/api#setstickerkeywords
  ['setStickerKeywords', { j: ['keywords'] }],

  // https://core.telegram.org/bots/api#setstickermaskposition
  ['setStickerMaskPosition', { j: ['mask_position'] }],

  // https://core.telegram.org/bots/api#answerinlinequery
  ['answerInlineQuery', { j: ['results', 'button'] }],

  // https://core.telegram.org/bots/api#answerwebappquery
  ['answerWebAppQuery', { j: ['result'] }],

  // https://core.telegram.org/bots/api#sendinvoice
  ['sendInvoice', { j: ['prices', 'suggested_tip_amounts', 'provider_data'] }],

  // https://core.telegram.org/bots/api#createinvoicelink
  ['createInvoiceLink', { j: ['prices', 'suggested_tip_amounts', 'provider_data'] }],

  // https://core.telegram.org/bots/api#answershippingquery
  ['answerShippingQuery', { j: ['shipping_options'] }]
]);

const checks = {
  // Required props of payload
  r(payload, props, method) {
    console.log(props, payload)
    const result = { ...payload };
    for (let prop of props)
      if (!(prop in result) || result[prop] === '')
        throw new PayloadValidationError(`Required Property: "${prop}" in method "${method}"`);

    return result;
  },
  // Json stringify props of payload
  j(payload, props) {
    const result = { ...payload };
    for (let prop of props)
      if (prop in result && typeof result[prop] !== 'string')
        result[prop] = JSON.stringify(result[prop]);

    return result;
  },

  // Stringify props of payload
  s(payload, props) {
    const result = { ...payload };
    for (let prop of props)
      if (prop in result)
        result[prop] = String(result[prop]);

    return result;
  }
};

export default class PayloadValidations {
  constructor(method, payload) {
    this.method = method;
    this.payload = checks.j(payload, ['reply_markup', 'entities', 'caption_entities', 'media']);
    this.payload = checks.s(this.payload, ['chat_id', 'from_chat_id', 'text']);
    this.validations = VALIDATIONS.get(method);
    console.log(this.validations)
  }

  validate() {
    if (!this.validations)
      return this.payload;

    for (let check in this.validations)
      this.payload = checks[check](this.payload, this.validations[check], this.method);

    return this.payload;
  }
}


