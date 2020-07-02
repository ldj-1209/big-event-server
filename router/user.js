/*
  用户信息相关接口
 */

const express = require('express')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common/db.js'))
const utils = require('utility')


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
router.post('/userinfo', async(req, res) => {
    let param = req.body
    console.log(param);

    let sql = 'update users set ? where id=?'
    let ret = await db.getData(sql, [{
        nickname: param.nickname,
        email: param.email
    }, param.id])

    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            meeages: '更改信息成功!'
        })
    } else {
        res.json({
            status: 1,
            meeages: '更改信息失败!'
        })
    }
})

//重置密码
router.post('/updatepwd', async(req, res) => {
    let param = req.body
    param.oldPwd = utils.md5(param.oldPwd)
    param.newPwd = utils.md5(param.newPwd)

    let id = req.user.id


    let sql = 'update users set ? where id=? and password =?'
    let ret = await db.getData(sql, [{
        password: param.newPwd
    }, id, param.oldPwd])
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            massage: '修改密码成功!'
        })
    } else {
        res.json({
            status: 1,
            massage: '修改密码失败!'
        })
    }



})

//更换头像
router.post('/update/avatar', async(req, res) => {

    let param = req.body
    let id = req.user.id


    let sql = 'update users set user_pic = ? where id = ?'
    let ret = await db.getData(sql, [param.avatar, id])


    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            massage: '更改头像成功!'
        })
    } else {
        res.json({
            status: 1,
            massage: '更改头像失败!'
        })
    }

})

module.exports = router