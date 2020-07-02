const mysql = require('mysql');
const util = require('util');
const config = require('../config/config.json');
const { value } = require('numeral');

const pool = mysql.createPool(config.mysql);
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