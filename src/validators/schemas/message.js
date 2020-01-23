import Joi from '@hapi/joi';

export const sendMessage = Joi.object().keys({
  to: Joi.string()
    .min(11)
    .required(),
  from: Joi.string()
    .max(11)
    .trim()
    .required(),
  text: Joi.string()
    .required()
    .trim(),
});

export const creditUnit = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .trim(),
  unit: Joi.string()
    .required()
});
