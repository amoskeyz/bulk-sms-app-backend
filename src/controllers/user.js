import db from '../db/models';
import { errorStatus, successStatus } from '../utils';


export default {
  handleSignUp: async (req, res) => {
    const {
      firstName, lastName, email, password, username
    } = req.body;

    const newEmail = email.toLowerCase();
    const newUsername = username.toLowerCase();

    try {
      const isExist = await db.User.findOne({ where: { email } });

      const isUserName = await db.User.findOne({ where: { username } });

      if (isExist) return errorStatus(res, 409, 'User Already Exist');
      if (isUserName) return errorStatus(res, 409, 'UserName Already Exist');

      const user = await db.User.create({
        firstName,
        lastName,
        email: newEmail,
        password,
        username: newUsername
      });
      return successStatus(res, 201, 'data', { ...user.response() });
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  }
};
