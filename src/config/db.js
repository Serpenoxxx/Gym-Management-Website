const { Pool } = require('pg')

module.exports = new Pool ({
    host: '',
    database: '',
    user: '',
    password: '',
    port: ,
    sslmode: '',
    ssl: true
})