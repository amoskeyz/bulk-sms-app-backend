import { Router } from 'express';
import user from './user';
import message from './message';
import transaction from './transaction';

const route = Router();

route.use('/user', user);
route.use('/message', message);
route.use('/transaction', transaction);

export default route;
