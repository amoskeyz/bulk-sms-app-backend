import { errorStatus, successStatus } from '../utils';
import db from '../db/models';

export default {
  coupon: async (req, res) => {
    const { code, count, amount } = req.body;
    // const { id } = req.user;

    try {
      const isExist = await db.Coupon.findOne({ where: { code } });

      if (isExist) return errorStatus(res, 400, 'coupon code already exist');

      await db.Coupon.create({
        code,
        count,
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
    let arr;

    try {
      const coupon = await db.Coupon.findOne({ where: { code } });
      const user = await db.User.findOne({ where: { id } });

      if (!coupon) return errorStatus(res, 400, 'Invalid Coupon Code');

      if (coupon.isExpired) return errorStatus(res, 400, 'Expired Coupon Code');

      if (coupon.users) {
        if (coupon.users.length === coupon.count) await coupon.update({ isExpired: true });

        const already = coupon.users.find(element => Number(element) === id);

        if (already) return errorStatus(res, 400, 'coupon code already used by you');

        arr = coupon.users;
        arr.push(id);
      } else arr = [id];

      await coupon.update({ users: arr });

      await user.update({ wallet: Number(user.wallet) + Number(coupon.amount) });

      return successStatus(res, 200, 'data', { message: `${coupon.amount} naira has been added to your wallet successfully'` });
    } catch (e) {
    /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },
};
