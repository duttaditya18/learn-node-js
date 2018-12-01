const validator = require("validator");
var _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2 })) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must be at least 8 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Passoword field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Passoword field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
