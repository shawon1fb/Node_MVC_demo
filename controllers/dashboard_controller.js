exports.dashboardGetController = (req, res, next) => {
    res.render(
        'pages/dashboard/dashboard',
        {title: "SignIn page"},)
}