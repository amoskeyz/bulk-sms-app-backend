import Joi from '@hapi/joi';

// const schema = {
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
