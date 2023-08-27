import RequestSender from './request-sender';
import BotContext from './bot-context';

export default function(token) {
  const request = new RequestSender(token);
  return new BotContext(request);
}