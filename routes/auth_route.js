const router = require('express').Router()

const {
    signInGetController,
    signInPostController,
    signUpGetController,
    signUpPostController,
    loginPostController,
    loginGetController,
    logout,
    signUpValidator,
} = require('../controllers/auth_controller')

router.get('/signin', signInGetController)
router.post('/signin', signInPostController)
router.get("/signup", signUpGetController)
router.post("/signup", signUpValidator, signUpPostController)
router.get("/logout", logout)

module.exports = router