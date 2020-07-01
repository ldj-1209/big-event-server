/*
  用户信息相关接口
 */

const express = require('express')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common/db.js'))


//  配置路由

// 获取用户信息
router.get('/userinfo', async(req, res) => {
    console.log(req.user);

    let sql = 'select id,username,nickname,email,user_pic from users where id=?'
    let ret = await db.getData(sql, req.user.id)
    console.log(ret);

    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            messages: '获取成功!',
            data: ret[0]
        })
    } else {
        res.json({
            status: 1,
            messages: '获取失败!'
        })
    }

})

// 更新用户信息
router.post('/userinfo', (req, res) => {

})


router.get('/userinfo', (req, res) => {

})

router.get('/userinfo', (req, res) => {

})

module.exports = router