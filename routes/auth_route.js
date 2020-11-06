const router = require('express').Router()

const {
    signInGetController,
    signInPostController,
    signUpGetController,
    signUpPostController,
    logout,


} = require('../controllers/auth_controller')

const {isUnAuthenticate}=require("../middleware/auth_middlewares")

const signUpValidator = require('../validator/auth/sign_up_validator')
const signInValidator = require('../validator/auth/sign_in_validator')
router.get('/signin',isUnAuthenticate, signInGetController)
router.post('/signin', signInValidator.signInValidator,isUnAuthenticate, signInPostController)
router.get("/signup",isUnAuthenticate, signUpGetController)
router.post("/signup", signUpValidator.signUpValidator,isUnAuthenticate, signUpPostController)
router.get("/logout", logout)

module.exports = router