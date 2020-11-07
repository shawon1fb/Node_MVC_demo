const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const {body, validationResult} = require('express-validator')
const errorFormatter = require('../utils/validatio_error_formater')

const Flash = require('../utils/Flash')


exports.signUpGetController = (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)
    res.render(
        'pages/auth/sign_up',
        {
            title: "Signup page",
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        },
    )
}

exports.signUpPostController = async (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)
    req.flash('fail',"please check your form")
    if (!errors.isEmpty()) {
        console.log("signUpPostController")
        console.log(errors.mapped())


        return res.render(
            'pages/auth/sign_up',
            {
                title: "Signup page",
                error: errors.mapped(),
                flashMessage: Flash.getMessage(req)
            },
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
    console.log("Flash.getMessage(req)")
    console.log(Flash.getMessage(req))
    res.render(
        'pages/auth/sign_in',
        {
            title: "SignIn page",
            flashMessage: Flash.getMessage(req)
        }
    )
}

exports.signInPostController = async (req, res, next) => {

    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)

        req.session.isLogin = true;
        req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            return res.redirect('/dashboard')
        })
        // res.status(200).send({user})


    } catch (e) {

        req.flash('success',"please check your form")
        return res.redirect('/auth/signin')
        /*return res.json({
            test: "signInPostController",
            "error": e.toString(),
        })*/
    }

}


exports.logout = (req, res, next) => {

    req.session.destroy(error => {

        if (error) {
            console.log(error)
            return next(error)
        }

        return res.redirect("/auth/signin")
    })
    /*
    res.json({
        test: "logout",
    })*/
}

