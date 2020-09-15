const { check } = require('express-validator');

const { User } = require("./db/models");


const validateUserSignUp = [
    check("username")
        // .exists({ checkFalsy: true })
        // .withMessage("username required")
        .isLength({ max: 50 })
        .withMessage("First name cannot be more than 50 characters long."),
    check('username').custom(value => {
        return User.findOne({where: { username: value }}).then(user => {
            if (user) {
            return Promise.reject('is already in use');
            }
        });
    }),
    check("email")
        // .exists({ checkFalsy: true })
        // .withMessage("email required")
        .isEmail()
        .withMessage("valid email address required"),
    check('email').custom(value => {
        return User.findOne({where: { email: value }}).then(user => {
            if (user) {
            return Promise.reject('is already in use');
            }
        });
    }),
    // check('password').custom((value, { req }) => {
    //     if (value !== req.body.passwordConfirm) {
    //         throw new Error('Password confirmation is incorrect');
    //     }
    // })
    // check("bio")
    //     .exists({ checkFalsy: true })
    //     .withMessage("bio required"),
    // check("imgUrl")
    //     .exists({ checkFalsy: true })
    //     .withMessage("image url required"),
];

module.exports = {
    validateUserSignUp
}
