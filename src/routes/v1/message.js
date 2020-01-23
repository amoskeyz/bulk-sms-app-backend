import { Router } from 'express';
import Message from '../../controllers/message';
import Validators from '../../validators';
import { authenticate, isAdministrator } from '../../middleware';
import { sendMessage, creditUnit } from '../../validators/schemas/message';

const route = Router();

route.post('/', Validators(sendMessage), authenticate, Message.handleMessage);
route.put('/credit', authenticate, isAdministrator, Validators(creditUnit), Message.creditUnit);
route.get('/', authenticate, Message.getSentMessage);
route.get('/:messageId', authenticate, Message.getSingleMessage);

export default route;
