import { Router } from 'express';
import Message from '../../controllers/message';
import Validators from '../../validators';
import { authenticate } from '../../middleware';
import { sendMessage } from '../../validators/schemas/message';

const route = Router();

route.post('/', Validators(sendMessage), authenticate, Message.handleMessage);

export default route;
