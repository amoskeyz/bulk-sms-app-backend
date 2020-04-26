import Joi from '@hapi/joi';

export const creditUnit = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .trim(),
  method: Joi.string()
    .required(),
  amount: Joi.string()
    .required(),
});
