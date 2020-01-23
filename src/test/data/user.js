import dotenv from 'dotenv';
// import { isAdministrator } from '../../middleware';

dotenv.config();

const user = [
  {
    firstName: 'test',
    lastName: 'yesrer',
    email: 'usero1@gmail.com',
    password: '5m5am0a843r03',
    username: 'testt'
  },

  {
    firstName: 'test',
    lastName: 'yesrer',
    email: 'useeeiir1@gmail.com',
    password: '5m5am0a843r03',
    username: 'testt'
  },
  {
    email: 'usero1@gmail.com',
    password: '5m5am0a843r03',
  },
  {
    email: 'userhhj1@gmail.com',
    password: '5m5am0a843r03',
  },
  {
    email: 'usero1@gmail.com',
    password: '5m5am0ajhjk843r03',
  },
  {
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD_TEST
  },
  {
    firstName: 'admin',
    lastName: 'super',
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD_TEST,
    username: 'isAdministrator',
    isAdmin: true
  }
];

export default user;
