import Joi from '@hapi/joi';

export const signUp = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .required()
    .trim(),
  password: Joi.string()
    .required()
    .min(6),
  username: Joi.string().required(),
});

export const login = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .trim(),
  password: Joi.string()
    .required()
    .min(6),
});

export const phoneBook = Joi.object().keys({
  phoneNumbers: Joi.string()
    .required()
    .trim(),
});
