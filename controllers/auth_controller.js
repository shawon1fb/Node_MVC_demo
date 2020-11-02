const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const {body, validationResult} = require('express-validator')
const errorFormatter = require('../utils/validatio_error_formater')


exports.signUpGetController = (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)
    res.render(
        'pages/auth/sign_up',
        {
            title: "Signup page",
            error: errors.mapped(),
        },
    )
}

exports.signUpPostController = async (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())


        return res.render(
            'pages/auth/sign_up',
            {title: "Signup page", error: errors.mapped()},
        )
        /*
        return res.json({
            error: errors.mapped(),
        })*/

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
        console.log(e.toString())
        return res?.json({
            error: e.toString(),
        })

        // next()
    }

}


exports.signInGetController = (req, res, next) => {
    console.log(req.session)
    res.render(
        'pages/auth/sign_in',
        {title: "SignIn page"}
    )
}

exports.signInPostController = async (req, res, next) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        req.session.isLogin = true;
        req.session.user = user
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

