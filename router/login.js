const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    res.send('nihao !')
})
module.exports = router