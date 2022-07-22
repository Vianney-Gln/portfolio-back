const Joi = require("joi");

const validateIntroFields = (data) => {
  return Joi.object({
    introduction: Joi.string().presence("optional"),
    actually: Joi.string().max(255).presence("optional"),
  }).validate(data, { abortEarly: false, allowUnknown: true }).error;
};

const validateProjectFields = (data, toCreate = true) => {
  const presence = toCreate ? "required" : "optional";
  return Joi.object({
    name: Joi.string().presence(presence),
    url: Joi.string().max(255).presence(presence),
    urlImage: Joi.string().presence("optional"),
    date: Joi.string().max(255).presence(presence),
    description: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false, allowUnknown: true }).error;
};

const validateContactFields = (data) => {
  return Joi.object({
    name: Joi.string()
      .max(100)
      .presence("required")
      .regex(/[$\(\)<>]/, { invert: true }),
    firstname: Joi.string()
      .max(100)
      .presence("required")
      .regex(/[$\(\)<>]/, { invert: true }),
    subject: Joi.string()
      .max(255)
      .presence("required")
      .regex(/[$\(\)<>]/, { invert: true }),
    message: Joi.string()
      .min(20)
      .max(255)
      .presence("required")
      .regex(/[$\(\)<>]/, { invert: true }),
    email: Joi.string()
      .email()
      .presence("required")
      .regex(/[$\(\)<>]/, { invert: true }),
  }).validate(data, { abortEarly: false, allowUnknown: true }).error;
};

module.exports = {
  validateIntroFields,
  validateProjectFields,
  validateContactFields,
};
