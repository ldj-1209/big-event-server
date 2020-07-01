const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const loginRouter = require(path.join(__dirname, 'router/login.js'))



app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.use('/api', loginRouter)

app.listen(3000, () => {
    console.log('running...');

})