const { check } = require('express-validator');

const { User } = require("./db/models");

const validateUserSignUp = [
  check("username")
    .isLength({ max: 50 })
    .withMessage("First name cannot be more than 50 characters long."),
  check('username').custom(value => {
    return User.findOne({where: { username: value }}).then(user => {
      if (user) {
        return Promise.reject('is already in use');
      };
    });
  }),
  check("email")
    .isEmail()
    .withMessage("valid email address required"),
  check('email').custom(value => {
    return User.findOne({where: { email: value }}).then(user => {
      if (user) {
        return Promise.reject('is already in use');
      };
    });
  }),
];

module.exports = {
  validateUserSignUp
};
