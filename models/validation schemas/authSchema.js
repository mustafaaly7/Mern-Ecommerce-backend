import Joi from "joi";


// for joi




// AUTH SCHEMA

//VALIDATION SCHEMA FOR REGISTRATION
export const  registerSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
// email: Joi.string()
// .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(6).required(),
  
});


//VALIDATION SCHEMA FOR Login
export const  loginSchema = Joi.object({
    // email: Joi.string().email().required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required(),
  });