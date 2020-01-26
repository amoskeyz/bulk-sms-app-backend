import { Router } from 'express';
import User from '../../controllers/user';
import Contact from '../../controllers/contacts';
import Validators from '../../validators';
import { signUp, login, phoneBook } from '../../validators/schemas/user';
import { authenticate } from '../../middleware';

const route = Router();

route.post('/signup', Validators(signUp), User.handleSignUp);
route.post('/login', Validators(login), User.handleLogin);
route.post('/phonebook', authenticate, Validators(phoneBook), Contact.createPhoneBook);

export default route;
