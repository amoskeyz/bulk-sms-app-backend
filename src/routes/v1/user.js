import { Router } from 'express';
import User from '../../controllers/user';
import Validators from '../../validators';
import { signUp } from '../../validators/schemas/user';

const route = Router();

route.post('/signup', Validators(signUp), User.handleSignUp);

export default route;
