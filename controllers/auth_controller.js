const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const {body, validationResult} = require('express-validator')
const errorFormatter = require('../utils/validatio_error_formater')
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


exports.signUpGetController = (req, res, next) => {
    res.render(
        'pages/auth/sign_up',
        {title: "Signup page"}
    )
}
exports.signUpPostController = async (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
       return  res.json({
            error: errors.mapped(),
        })
    }

    let {username, email, password, confirmPassword,} = req.body
    //  console.log(req.body)
    try {

        let user = new User({
            username,
            email,
            password,
        })
        let createdUser = await user.save()

        res.json({
            test: createdUser.toJSON(),
        })
    } catch (e) {
        console.log("error")
        console.log(e)
        return res.json({
            error: e.toString(),
        })

        // next()
    }

}


exports.signInGetController = (req, res, next) => {
    res.render(
        'pages/auth/sign_in',
        {title: "SignIn page"}
    )
}

exports.signInPostController = async (req, res, next) => {


    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.status(200).send({user})

    } catch (e) {
        return res.json({
            test: "signInPostController",
            "error": e.toString(),
        })
    }

}


exports.loginGetController = (req, res, next) => {
    res.json({
        test: "loginGetController",
    })
}

exports.loginPostController = (req, res, next) => {
    res.json({
        test: "loginPostController",
    })
}

exports.logout = (req, res, next) => {
    res.json({
        test: "logout",
    })
}

