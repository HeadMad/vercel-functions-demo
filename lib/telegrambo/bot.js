import RequestSender from './request-sender';
import BotContext from './bot-context';

export default function(token) {
  const request = RequestSender(token);
  return BotContext(request);
}
