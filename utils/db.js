const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'internet_banking'
})

const mysql_query = util.promisify(pool.query).bind(pool);
module.exports = {
    load: sql => {
        return mysql_query(sql);
    },
    add: (table, entity) => {
        return mysql_query(`insert into ${table} set ?`, entity);
    },
    del: (table, entity) => {
        return mysql_query(`delete from ${table} where ?`, entity);
    },
    edit: (table, entity, entityId) => {
        return mysql_query(`update ${table} set ? where ?`, [entity, entityId]);
    }
}