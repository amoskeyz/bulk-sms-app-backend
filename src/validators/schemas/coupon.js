import Joi from '@hapi/joi';

export const coupon = Joi.object().keys({
  amount: Joi.string()
    .required(),
  code: Joi.string()
    .required(),
  count: Joi.number()
    .required()
});

export const loadCoupon = Joi.object().keys({
  code: Joi.string()
    .required(),
});
