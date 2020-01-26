import { errorStatus, successStatus } from '../utils';
import db from '../db/models';
import phonebook from '../data/phonebook';

export default {
  createPhoneBook: async (req, res) => {
    try {
      const { username, id } = req.user;
      const { phoneNumbers } = req.body;

      const isPhoneBook = await db.Phonebook.findOne({ where: { userId: id } });


      if (isPhoneBook) return errorStatus(res, 400, 'phoneBook already exist, Try Updating instead');

      phonebook[username] = phoneNumbers;

      await db.Phonebook.create({
        userId: id,
        url: `phonebook.${username}`
      });

      return successStatus(res, 201, 'message', 'Phonebook Successfully Created');
    } catch (e) {
      return errorStatus(res, 500, 'Server Error');
    }
  },
};
