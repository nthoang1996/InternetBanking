const db = require('../utils/db');
// const config = require('../config/default.json')
module.exports = {
    all: (table) => { return db.load(`select * from ${table};`) },
    single_by_id: (table, id) => { return db.load(`select * from ${table} where id = ${id}`) },
    single_by_idString: (table, id) => { return db.load(`select * from ${table} where id = '${id}'`) },
    all_by_pid: (table, id) => { return db.load(`select * from ${table} where parent_id = ${id}`) },
    add: (table, entity) => { return db.add(table, entity) },
    del: (table, entity) => { return db.del(table, entity) },
    edit: (table, entity, entityId) => {
        return db.edit(table, entity, entityId)
    },
    single_by_email: async(table, email) => {
        const rows = await db.load(`select * from ${table} where email = '${email}'`);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },
    compare_with_bankId: async(table, bankID) => {
        const rows = await db.load(`select * from ${table} where id = '${bankID}'`);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },
};