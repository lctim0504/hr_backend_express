import Joi from 'joi';

export const accountSchema = Joi.object({
  account: Joi.string().required(),
  password: Joi.string().required()
});


