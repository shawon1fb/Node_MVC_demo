const Flash = require('../utils/Flash')

exports.dashboardGetController = (req, res, next) => {
    res.render(
        'pages/dashboard/dashboard',
        {
            title: "SignIn page",
            flashMessage: Flash.getMessage(req)
        },)
}