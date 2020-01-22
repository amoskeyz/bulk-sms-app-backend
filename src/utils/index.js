import jwt from 'jsonwebtoken';

export const errorStatus = (res, statusCode, errorMessage) => res.status(statusCode).json({
  status: statusCode,
  error: errorMessage,
});

export const successStatus = (res, status, key, object) => {
  const response = { status };
  response[key] = object;
  return res.status(status).json(response);
};

export const validateJoi = (validateObject, schemaData) => {
  let error;
  const err = schemaData.validate(validateObject, { abortEarly: false });
  if (err.error) {
    error = err.error.details;
    error = error.map(singleErrors => {
      let { message } = singleErrors;
      message = message.replace(/"/gi, '');
      if (message.includes('[A-Za-z]')) {
        message = `${singleErrors.path[0]} should be a string with at least 3 characters`;
      }
      return message;
    });
  }
  return error;
};

export const getToken = (id, email) => jwt.sign({ id, email }, process.env.SECRET, {
  expiresIn: '5h',
});

export const decodeToken = token => jwt.verify(token, process.env.SECRET);
