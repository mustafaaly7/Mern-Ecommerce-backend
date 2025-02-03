import Joi from "joi";

export const bookSchema = Joi.object({
  url: Joi.string().uri().required(),
  author: Joi.string().min(3).max(100).required(),
  title: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().min(10).max(1000).required(),
  language: Joi.string().min(2).max(50).required(),
});
