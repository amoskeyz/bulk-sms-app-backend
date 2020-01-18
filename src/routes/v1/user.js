import { Router } from 'express';
import User from '../../controllers/user';
import Validators from '../../validators';
import { signUp, login } from '../../validators/schemas/user';

const route = Router();

route.post('/signup', Validators(signUp), User.handleSignUp);
route.post('/login', Validators(login), User.handleLogin);

export default route;
