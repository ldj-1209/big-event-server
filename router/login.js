/*
   登录注册接口
*/

const express = require('express')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common/db.js'))
const utils = require('utility')
const jwt = require('jsonwebtoken')

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

//用户登录接口
router.post('/login', async(req, res) => {

    req.body.password = utils.md5(req.body.password)
    let param = req.body


    let sql = 'select id from users where username=? and password=?'

    let ret = await db.getData(sql, [param.username, param.password])

    if (ret && ret.length > 0) {

        // 生成登录成功状态的唯一标识token
        let token = jwt.sign({
            username: param.username,
            id: ret[0].id
        }, 'bigevent', {
            expiresIn: '10h'
        })
        res.json({
            status: 0,
            message: '登录成功 !',
            token: 'Bearer ' + token
        })

    } else {
        res.json({
            status: 1,
            message: '登录失败 !'
        })
    }


})

module.exports = router