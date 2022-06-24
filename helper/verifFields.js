const Joi = require("joi");

const validateIntroFields = (data) => {
  return Joi.object({
    introduction: Joi.string().presence("optional"),
    actually: Joi.string().max(255).presence("optional"),
  }).validate(data, { abortEarly: false, allowUnknown: true }).error;
};

module.exports = { validateIntroFields };
