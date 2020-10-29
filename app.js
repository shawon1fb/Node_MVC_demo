const express = require("express")

const authRouter = require('./routes/auth_route')

const morgan = require('morgan')

const app = express()
///setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')


const middleWareArray = [
    morgan("dev"),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
]
app.use(middleWareArray)

app.use(authRouter)

app.get('/', (req, res) => {

    res.render('pages/auth/sign_up', {title: "Sign up"});

})


app.get('*', (req, res) => {

    res.json({
        message: "error"
    });

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {


    console.log(`Server listen on PORT ${PORT}`)

})