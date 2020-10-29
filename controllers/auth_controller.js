const User = require('../models/user_model')
const bcrypt = require('bcrypt')

exports.signUpGetController = (req, res, next) => {
    res.render(
        'pages/auth/sign_up',
        {title: "Signup page"}
    )
}
exports.signUpPostController = async (req, res, next) => {
    let {username, email, password, confirmPassword,} = req.body

    //  console.log(req.body)
    let user = new User({
        username,
        email,
        password,
    })

    try {
        let createdUser = await user.save()

        res.json({
            test: createdUser.toJSON(),
        })
    } catch (e) {
        console.log("error")
        console.log(e)
        next()
    }

}


exports.signInGetController = (req, res, next) => {
    res.json({
        test: "signInGetController",
    })
}

exports.signInPostController = (req, res, next) => {
    res.json({
        test: "signInPostController",
    })
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

