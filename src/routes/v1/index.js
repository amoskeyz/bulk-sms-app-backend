import { Router } from 'express';
import user from './user';
import message from './message';
import transaction from './transaction';
import coupon from './coupon';

const route = Router();

route.use('/user', user);
route.use('/message', message);
route.use('/transaction', transaction);
route.use('/coupon', coupon);

export default route;
