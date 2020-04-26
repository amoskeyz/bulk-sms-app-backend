import { errorStatus, successStatus } from '../utils';
import db from '../db/models';
// import phonebook from '../data/phonebook';

export default {
  createPhoneBook: async (req, res) => {
    try {
      const { id } = req.user;
      const { contacts, name } = req.body;

      const isPhoneBook = await db.Phonebook.findOne({ where: { userId: id } && { name } });


      if (isPhoneBook) return errorStatus(res, 400, `phoneBook '${name}' already exist`);

      // phonebook[username] = phoneNumbers;

      await db.Phonebook.create({
        userId: id,
        contacts: [contacts],
        name
      });

      return successStatus(res, 201, 'message', 'Phonebook Successfully Created');
    } catch (e) {
      return errorStatus(res, 500, 'Server Error');
    }
  },

  getContacts: async (req, res) => {
    try {
      const { id } = req.user;
      const phoneBook = await db.Phonebook.findAll({ where: { userId: id } });

      if (!phoneBook[0]) return errorStatus(res, 400, 'PhoneBook is Empty');

      return successStatus(res, 200, 'data', phoneBook);
    } catch (e) {
      /* istanbul ignore next */
      console.log(e);
      return errorStatus(res, 500, 'Server Error');
    }
  },
};
