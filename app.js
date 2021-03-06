const express = require("express")

const authRouter = require('./routes/auth_route')
const dashboardRouter = require('./routes/dashboard_route')
const flash = require('connect-flash')

const session = require('express-session')

const {sessionStore} = require('./db/session_db')
const {bindUserWithRequest} = require('./middleware/auth_middlewares')
const setLocals = require('./middleware/set_locals')
require('./db/mongoos')


const morgan = require('morgan')

const app = express()
///setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

const {requestBodyPrinter} = require('./middleware/request_printer_middleware')
const middleWareArray = [
    //morgan("dev"),

    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    requestBodyPrinter,
    session(
        {
            secret: process.env.SECRET_KEY || "SECRET_KEY",
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            /*cookie: {
                maxAge: 60 * 60 * 2,
            }*/
        }
    ),
    bindUserWithRequest(),
    setLocals(),
    flash(),
]

app.use(middleWareArray)

app.use("/auth", authRouter)
app.use("/dashboard", dashboardRouter)

app.get('/', (req, res) => {

    res.redirect('/auth/signin')

})


app.get('*', (req, res) => {

    res.json({
        message: "No Route with this end point"
    });

})

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {


    console.log(`Server listen on PORT ${PORT}`)

})