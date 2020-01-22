import { Router } from 'express';
import user from './user';
import message from './message';

const route = Router();

route.use('/user', user);
route.use('/message', message);

export default route;
