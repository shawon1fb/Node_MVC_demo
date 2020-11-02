const router = require('express').Router()

const {
    dashboardGetController,
} = require('../controllers/dashboard_controller')

router.get('/', dashboardGetController)

module.exports = router