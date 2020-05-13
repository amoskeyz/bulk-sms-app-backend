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
      return errorStatus(res, 500, 'Server Error');
    }
  },
  coupon: async (req, res) => {
    const { code, users, amount } = req.body;
    // const { id } = req.user;

    try {
      const isExist = await db.Coupon.findOne({ where: { code } });

      if (!isExist) return errorStatus(res, 400, 'coupon code already exist');

      await db.Coupon.create({
        code,
        users,
        amount,
      });

      return successStatus(res, 200, 'data', 'coupon added succesfully');
    } catch (e) {
    /* istanbul ignore next */
      console.log(e);
      return errorStatus(res, 500, 'Server Error');
    }
  },
  loadCoupon: async (req, res) => {
    const { code } = req.body;
    const { id } = req.user;

    try {
      const coupon = await db.Coupon.findOne({ where: { code } });
      const user = await db.User.findOne({ where: { id } });

      if (!coupon) return errorStatus(res, 404, 'Invalid Coupon Code');

      // if (coupon.user.length > coupon.user.count) await coupon.update({ isExpired: true });

      if (coupon.isExpired) return errorStatus(res, 404, 'Expired Coupon Code');

      if (coupon.user.length > coupon.user.count) await coupon.update({ isExpired: true });

      const arr = coupon.users.push(id);

      await coupon.update({ count: (coupon.count) + 1 });

      await coupon.update({ users: arr });

      await user.update({ wallet: Number(user.wallet) + Number(coupon.amount) });

      return successStatus(res, 200, 'data', { message: `${coupon.amount} has been added to your wallet successfully'` });
    } catch (e) {
    /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },
};
