import Message from '../utils/message';
import { errorStatus, successStatus } from '../utils';
import db from '../db/models';

export default {
  handleMessage: async (req, res) => {
    const { text, from, to } = req.body;
    let isPage;
    try {
      const { creditUnit, id } = req.user;

      const isDecimal = (text.length % 160);

      if (isDecimal === 0) isPage = text.length / 160;
      else isPage = ((text.length / 160) + 1);

      const totalPage = Math.floor(isPage);
      const recipient = to.split(',');
      const totalUnit = (totalPage * recipient.length);

      if (Number(creditUnit) < totalUnit) return errorStatus(res, 400, 'Insufficient Unit to perform this Operation');

      const send = await Message.sendMessage(text, from, to);
      await db.User.update({ creditUnit: Number(creditUnit) - totalUnit }, { where: { id } });
      const message = await db.Message.create({
        sender: from,
        recipient: to,
        userId: id,
        text
      });
      return successStatus(res, 200, 'data', { send, message });
    } catch (e) {
      /* istanbul ignore next */
      console.log(e);
      return errorStatus(res, 400, 'Message Not Sent');
    }
  }
};
