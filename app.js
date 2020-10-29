const express = require("express")

const app = express()

const authRouter = require('./routes/auth_route')


app.use(authRouter)
app.get('/', (req, res) => {

    res.json({
        message: " test message"
    });

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