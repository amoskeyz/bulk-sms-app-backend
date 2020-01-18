import { validateJoi, errorStatus } from '../utils';

const validate = schema => (req, res, next) => {
  const validateObject = {
    ...req.body,
  };

  const error = validateJoi(validateObject, schema);
  if (error) {
    return errorStatus(res, 400, error);
  }
  return next();
};

export default validate;
