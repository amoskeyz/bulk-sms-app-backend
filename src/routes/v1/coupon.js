import { Router } from 'express';
import Coupon from '../../controllers/coupon';
import Validators from '../../validators';
import { authenticate, isAdministrator } from '../../middleware';
import { loadCoupon, coupon } from '../../validators/schemas/coupon';

const route = Router();

route.post('/', Validators(coupon), authenticate, isAdministrator, Coupon.coupon);
route.patch('/', Validators(loadCoupon), authenticate, Coupon.loadCoupon);
// route.delete('/:messageId', authenticate, Message.deleteMessage);

export default route;
