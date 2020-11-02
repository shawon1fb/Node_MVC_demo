const router = require('express').Router()

const {isAuthenticate} = require('../middleware/auth_middlewares')
const {
    dashboardGetController,
} = require('../controllers/dashboard_controller')

router.get('/', isAuthenticate, dashboardGetController)

module.exports = router