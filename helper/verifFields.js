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
    date: Joi.string().max(255).presence(presence),
    description: Joi.string().presence(presence),
  }).validate(data, { abortEarly: false, allowUnknown: true }).error;
};

module.exports = { validateIntroFields, validateProjectFields };
