const express = require('express')
const path = require('path')
const app = express()
const jwt = require('express-jwt')
const cors = require('cors')
const loginRouter = require(path.join(__dirname, 'router/login.js'))
const userRouter = require(path.join(__dirname, 'router/user.js'))
const cateRouter = require(path.join(__dirname, 'router/categories.js'))


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.use(jwt({
    secret: 'bigevent'
}).unless({
    path: /^\/api/
}))

app.use('/api', loginRouter)
app.use('/my', userRouter)
app.use('/my/article', cateRouter)


app.listen(3000, () => {
    console.log('running...');

})