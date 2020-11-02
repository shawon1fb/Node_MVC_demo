const User = require('../models/user_model')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLogin) {
            return next();
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
        } catch (e) {
            console.log(e);
            next();
        }
    }
}

exports.isAuthenticate = (req, res, next) => {
    console.log(req.session)
    if (!req.session.isLogin) {
        return res.redirect('/auth/signin')
    }

    next()
}