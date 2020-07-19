const db = require('../utils/db');
// const config = require('../config/default.json')
module.exports = {
    all: (table) => { return db.load(`select * from ${table};`) },
    all_by_source_id: (table, source_id) => {
        return db.load(`select * from ${table} where source_id = ${source_id};`);
    },
    all_by_id_user: (table, id_user) => {
        return db.load(`select * from ${table} where id_user = ${id_user};`);
    },
    all_by_root_id: (table, root_id) => {
        return db.load(`select * from ${table} where root_id = ${root_id};`);
    },
    single_by_id: (table, id) => { return db.load(`select * from ${table} where id = "${id}"`) },
    single_by_idString: (table, id) => { return db.load(`select * from ${table} where id = '${id}'`) },
    single_by_username_id: (table, username_id) => { return db.load(`select * from ${table} where username = '${username_id}'`) },
    add: (table, entity) => { return db.add(table, entity) },
    del: (table, entity) => { return db.del(table, entity) },
    edit: (table, entity, entityId) => {
        return db.edit(table, entity, entityId)
    },
    single_by_username: async(table, username) => {
        const rows = await db.load(`select * from ${table} where username = '${username}'`);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },
    verify_refresh_token: async(userID, refreshToken) => {
        // const condition = {
        //     ID: userID,
        //     refreshToken: token
        // }

        const sql = `select * from userrefreshtokenext where id = ${userID} and refresh_token = '${refreshToken}'`;
        console.log(sql);
        const rows = await db.load(sql);
        if(rows.length > 0){
            return true;
        }
        return false;
    },
    update_password: async(table, password, id)=>{ return await db.edit(table, password, id) },
    update_status_debitItem: async (table, status,id)=> await db.edit(table,status,id),
};