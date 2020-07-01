function getData(sql, params) {
    return new Promise((resolve, reject) => {

        const mysql = require('mysql')

        const cn = mysql.createConnection({

            host: 'localhost',

            database: 'bigeventapi',

            user: 'root',
            password: 'ldj1209'
        })

        cn.connect()

        cn.query(sql, params, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }

        })

        cn.end()

    })

}



module.exports = {
    getData
}