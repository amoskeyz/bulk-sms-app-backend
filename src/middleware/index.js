import { decodeToken } from '../utils';
import db from '../db/models';

export const authenticate = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  try {
    const decodedToken = decodeToken(token);

    const { email } = decodedToken;

    const user = await db.User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).send({
        error: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send({
      error: 'Unauthorized access',
    });
  }
};

export const isAdministrator = async (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin === false) {
    return res.status(400).json({
      error: 'You Are Not Allowed to Access This Route'
    });
  } next();
};
