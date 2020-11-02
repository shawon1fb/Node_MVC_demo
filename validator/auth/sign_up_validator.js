

const {body, validationResult} = require('express-validator')

exports.signUpValidator = [
    body('username')
        .isLength({min: 2, max: 15})
        .withMessage("Username must be between 2 to 15")
        .custom(async username => {

            let user = await User.findOne({username})
            if (user) {
                return Promise.reject("Username already in used")
            }
        }).trim()
    ,

    body('email')
        .isEmail()
        .withMessage('Please Provide a valid email')
        .custom(async email => {
            let user = await User.findOne({email})
            if (user) {
                return Promise.reject("email already in used")
            }

        })
        .normalizeEmail()
    ,

    body('password')
        .isLength({min: 5})
        .withMessage("your password must be greater then 5")


]
