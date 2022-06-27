const Joi = require("joi");

const validateIntroFields = (data) => {
  return Joi.object({
    introduction: Joi.string().presence("optional"),
    actually: Joi.string().max(255).presence("optional"),
  }).validate(data, { abortEarly: false, allowUnknown: true }).error;
};

const validateProjectFields = (data) => {
  return Joi.object({
    name: Joi.string().presence("required"),
    url: Joi.string().max(255).presence("required"),
    date: Joi.string().max(255).presence("required"),
    description: Joi.string().presence("required"),
  }).validate(data, { abortEarly: false, allowUnknown: true }).error;
};

module.exports = { validateIntroFields, validateProjectFields };
