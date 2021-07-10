import Joi from 'joi';

const schema = Joi.object({
  x: Joi.number()
    .min(1)
    .required(),

  y: Joi.number()
    .min(1)
    .required(),

  z: Joi.number()
    .min(1)
    .required(),
});

export default schema;
