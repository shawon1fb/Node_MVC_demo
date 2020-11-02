const router = require('express').Router()

const {
    signInGetController,
    signInPostController,
    signUpGetController,
    signUpPostController,
    loginPostController,
    loginGetController,
    logout,

} = require('../controllers/auth_controller')

const signUpValidator = require('../validator/auth/sign_up_validator')
const signInValidator = require('../validator/auth/sign_in_validator')
router.get('/signin', signInGetController)
router.post('/signin', signInValidator.signInValidator, signInPostController)
router.get("/signup", signUpGetController)
router.post("/signup", signUpValidator.signUpValidator, signUpPostController)
router.get("/logout", logout)

module.exports = router