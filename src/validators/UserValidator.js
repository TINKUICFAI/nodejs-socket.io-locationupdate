const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
  const validateRegister = async (req, res, next) => {
    const v = new Validator(req.body, {
      name: validations.general.requiredString,
      phone: validations.general.requiredString,
      email: validations.general.requiredString,
      password: validations.general.requiredString,
      profileImage: validations.general.requiredString,
      latitude: validations.general.requiredString,
      longitude: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateEmailAndPassword = async (req, res, next) => {
    const v = new Validator(req.body, {
      email: validations.user.existsEmail,
      password: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateChangePassword = async (req, res, next) => {
    const v = new Validator(req.body, {
      newPassword: validations.general.requiredString,
      currentPassword: validations.general.requiredString,
      confirmPassword: validations.general.requiredString,
    });

    validate(v, res, next, req);
  };

  const validateAddress = async (req, res, next) => {
    const v = new Validator(req.body, {
      address: validations.general.requiredString,
      country: validations.general.requiredString,
      city: validations.general.requiredString,
      state: validations.general.requiredString,
      pinCode: validations.general.requiredInt,
    });

    validate(v, res, next, req);
  };

  return {
    validateRegister,
    validateEmailAndPassword,
    validateChangePassword,
    validateAddress,
  };
};
