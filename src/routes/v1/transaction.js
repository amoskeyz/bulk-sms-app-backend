import { Router } from 'express';
import Transaction from '../../controllers/transaction';
import Validators from '../../validators';
import { authenticate, isAdministrator } from '../../middleware';
import { creditUnit } from '../../validators/schemas/transaction';

const route = Router();

route.put('/', Validators(creditUnit), authenticate, isAdministrator, Transaction.makeTransaction);
route.get('/', authenticate, Transaction.getTransactions);
// route.delete('/:messageId', authenticate, Message.deleteMessage);

export default route;
