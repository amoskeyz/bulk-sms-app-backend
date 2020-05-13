import db from '../db/models';
import {
  errorStatus, successStatus, uploadImage, deleteImage
} from '../utils';


export default {
  handleSignUp: async (req, res) => {
    const {
      firstName, lastName, email, password, username, phoneNumber
    } = req.body;

    const newEmail = email.toLowerCase();
    const newUsername = username.toLowerCase();

    try {
      const isExist = await db.User.findOne({ where: { email } });

      const isUserName = await db.User.findOne({ where: { username } });

      if (isExist) return errorStatus(res, 409, 'User Already Exist');
      if (isUserName) return errorStatus(res, 409, 'UserName Already Exist');

      const user = await db.User.create({
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email: newEmail,
        password,
        username: newUsername,
        phoneNumber,
      });
      return successStatus(res, 201, 'data', { ...user.response() });
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },
  handleLogin: async (req, res) => {
    const {
      email, password
    } = req.body;

    const newEmail = email.toLowerCase();

    try {
      const user = await db.User.findOne({
        where: { email: newEmail }
      });

      if (!user) {
        return errorStatus(res, 400, 'Invalid email or password');
      }

      const isPasswordValid = await user.passwordsMatch(password);

      if (!isPasswordValid) {
        return errorStatus(res, 400, 'Invalid email or password');
      }
      return successStatus(res, 200, 'data', { ...user.response() });
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },

  handleGetUser: async (req, res) => {
    const { email } = req.body;

    const newEmail = email.toLowerCase();

    try {
      const user = await db.User.findOne({
        where: { email: newEmail }
      });

      if (!user) {
        return errorStatus(res, 400, `'${email}' does not exist`);
      }
      return successStatus(res, 200, 'data', user.dataValues);
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },

  handleGetUserEmail: async (req, res) => {
    const { email } = req.body;

    const newEmail = email.toLowerCase();

    try {
      const user = await db.User.findOne({
        where: { email: newEmail }
      });

      if (!user) {
        return errorStatus(res, 400, `'${email}' does not exist`);
      }
      return successStatus(res, 200, 'data', user.email);
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },
  updateUser: async (req, res) => {
    const {
      inAppNotification,
      emailNotification,
      firstName,
      lastName,
      phoneNumber,
      senderId,
      reminder,
      delivery,
      // username
    } = req.body;

    let username = req.body.username || req.user.username;
    username = username.toLowerCase();

    if (req.file && req.user.image) await deleteImage(`${username}-profileImg`);

    const image = req.files
      ? await uploadImage(req.files.image, `${username}-profileImg`)
      : req.user.image;

    if (req.body.username) {
      const foundUser = await db.User.findOne({
        where: { username: req.body.username }
      });
      if (foundUser) {
        if (foundUser.id !== req.user.id) return errorStatus(res, 400, 'Username already exist');
      }
    }

    try {
      await req.user.update(
        {
          username,
          firstName:
          firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : req.user.firstName,
          lastName:
          lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : req.user.lastName,
          image,
          delivery: delivery || req.user.delivery,
          inAppNotification: inAppNotification || req.user.inAppNotification,
          emailNotification: emailNotification || req.user.emailNotification,
          senderId: senderId || req.user.senderId,
          reminder: reminder || req.user.reminder,
          phoneNumber: phoneNumber || req.user.phoneNumber,
        }
      );
      return successStatus(res, 200, 'data', 'User profile successfully updated');
    } catch (e) {
      /* istanbul ignore next */
      console.log(e);
      return errorStatus(res, 500, 'Server Error');
    }
  }
};
