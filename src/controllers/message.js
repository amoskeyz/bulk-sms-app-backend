import Message from '../utils/message';
import { errorStatus, successStatus } from '../utils';
import db from '../db/models';

export default {
  handleMessage: async (req, res) => {
    const { text, from, to } = req.body;
    let isPage;
    try {
      const { wallet, id } = req.user;

      const isDecimal = (text.length % 160);

      if (isDecimal === 0) isPage = text.length / 160;
      else isPage = ((text.length / 160) + 1);

      const totalPage = Math.floor(isPage);
      const recip = to.split(',');
      const totalUnit = (totalPage * recip.length);

      if ((Number(wallet) / 0.9) < totalUnit) return errorStatus(res, 400, 'Insufficient Unit to perform this Operation');

      const send = await Message.sendMessage(text, from, to);

      // if (send.split(' ')[0] !== 'OK') return errorStatus(res, 400, 'Message Not Sent');

      await db.User.update({ wallet: Number(wallet) - (totalUnit * 0.9) }, { where: { id } });

      const message = await db.Message.create({
        sender: from,
        recipient: to,
        userId: id,
        text,
        phone: recip
      });
      return successStatus(res, 200, 'data', { send, message });
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 400, 'Message Not Sent');
    }
  },
  creditUnit: async (req, res) => {
    const { email, unit } = req.body;
    try {
      const user = await db.User.findOne({ where: { email } });

      if (!user) return errorStatus(res, 404, 'User Not Found');

      await user.update({ creditUnit: Number(user.creditUnit) + Number(unit) });

      return successStatus(res, 200, 'data', { message: `${unit} credit unit added successfully to '${email}'` });
    } catch (e) {
    /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },
  getSentMessage: async (req, res) => {
    try {
      const { id } = req.user;
      const sentMessage = await db.Message.findAll({ where: { userId: id } });

      if (!sentMessage[0]) return errorStatus(res, 400, 'No Message Found');

      return successStatus(res, 200, 'data', sentMessage);
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },
  getSingleMessage: async (req, res) => {
    try {
      const { id } = req.user;
      const { messageId } = req.params;
      const singleMessage = await db.Message.findOne({ where: { id: messageId } });

      if (singleMessage) {
        if (singleMessage.userId !== id) return errorStatus(res, 400, 'Unauthorize Access');

        return successStatus(res, 200, 'data', singleMessage);
      }
      return errorStatus(res, 400, 'Message Not Found');
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.user;
      const { messageId } = req.params;
      const singleMessage = await db.Message.findOne({ where: { id: messageId } });

      if (singleMessage) {
        if (singleMessage.userId !== id) return errorStatus(res, 400, 'Unauthorize Access');

        await singleMessage.destroy();
        return successStatus(res, 200, 'message', 'Delete Successful');
      }
      return errorStatus(res, 400, 'Message Not Found');
    } catch (e) {
      /* istanbul ignore next */
      return errorStatus(res, 500, 'Server Error');
    }
  }
};
