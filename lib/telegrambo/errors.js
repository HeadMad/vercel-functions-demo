export class BotContextErrors extends Error {
  constructor(message) {
    super(message);
    this.name = 'BotContextErrors';
  }
}