const express = require('express')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common/db.js'))
const utils = require('utility')

//注册用户接口
router.post('/reguser', async(req, res) => {
    req.body.password = utils.md5(req.body.password)
    let param = req.body

    let sql = 'insert into users set ?'

    let ret = await db.getData(sql, param)
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '注册成功 !'
        })
    } else {
        res.json({
            status: 1,
            message: '注册失败 !'
        })
    }
})

router.get('/login', async(req, res) => {


    let sql = 'select * from users'

    let ret = await db.getData(sql, null)

    res.json({
        status: 0,
        data: ret
    })


})

module.exports = router