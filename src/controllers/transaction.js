import { errorStatus, successStatus } from '../utils';
import db from '../db/models';

export default {
  getTransactions: async (req, res) => {
    try {
      const { id } = req.user;
      const transactions = await db.Transaction.findAll({ where: { userId: id } });

      if (!transactions[0]) return errorStatus(res, 400, 'No Transaction Found');

      return successStatus(res, 200, 'data', transactions);
    } catch (e) {
      /* istanbul ignore next */
      console.log(e);
      return errorStatus(res, 500, 'Server Error');
    }
  },

  makeTransaction: async (req, res) => {
    const { email, amount, method } = req.body;
    // const { id } = req.user;

    try {
      const user = await db.User.findOne({ where: { email } });

      if (!user) return errorStatus(res, 404, 'User Not Found');

      await user.update({ wallet: Number(user.wallet) + Number(amount) });

      await db.Transaction.create({
        amount,
        method,
        userId: user.id,
      });

      return successStatus(res, 200, 'data', { message: `${amount} added successfully to '${email}'` });
    } catch (e) {
    /* istanbul ignore next */
      console.log(e);
      return errorStatus(res, 500, 'Server Error');
    }
  },
};
