
const {body, validationResult} = require('express-validator')


exports.signInValidator=[

    body('email').isEmail(),
    body('password').isEmpty(),
]