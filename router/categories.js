const express = require('express')
const router = express.Router()
const path = require('path')
const {
    brotliDecompress
} = require('zlib')
const db = require(path.join(__dirname, '../common/db.js'))


//获取分类列表
router.get('/cates', async(req, res) => {

    let sql = 'select * from categories'

    let ret = await db.getData(sql)



    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: '获取文章分类列表成功!',
            data: ret
        })
    } else {
        res.json({
            status: 1,
            message: '获取文章分类列表失败!'

        })
    }

})


// 新增文章分类
router.post('/addcates', async(req, res) => {
    let param = req.body

    let sql = 'insert into categories set ?'

    let ret = await db.getData(sql, param)
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '添加成功!'
        })
    } else {
        res.json({
            status: 1,
            message: '添加失败!'
        })
    }

})

// 根据 Id 删除文章分类
router.get('/deletecate/:id', async(req, res) => {
    let param = req.params.id

    let sql = 'delete from categories where id = ?'

    let ret = await db.getData(sql, param)

    if (ret && ret.affectedRows > 0) {
        res.json({
            stustas: 0,
            message: '删除成功!'
        })
    } else {
        res.json({
            stustas: 1,
            message: '删除失败!'
        })
    }

})


// 根据 Id 获取文章分类数据
router.get('/cates/:id', async(req, res) => {
    let param = req.params.id


    let sql = 'select * from categories where id= ?'

    let ret = await db.getData(sql, param)

    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: '获取成功!',
            data: ret
        })
    } else {
        res.json({
            status: 1,
            message: '获取失败!',

        })
    }
})

// 根据 Id 更新文章分类数据
router.post('/updatecate', async(req, res) => {
    let param = req.body

    let sql = 'update categories set ? where id=?'

    let ret = await db.getData(sql, [{
        name: param.name,
        alias: param.alias
    }, param.id])

    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '更改成功!'
        })
    } else {
        res.json({
            status: 1,
            message: '更改失败!'
        })
    }


})

module.exports = router