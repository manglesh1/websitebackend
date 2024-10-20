'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const unsubscribe = async (email,BulkEmail) => {
    try {
       let m = new Date();
       let LastUpdate = m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
        let pool = await sql.connect(config.sql);
                const sqlQueries = await utils.loadSqlQueries('events');
                const update = await pool.request()
                                .input('email',email)
                                .input('BulkEmail',BulkEmail)
                                .input('LastUpdate',LastUpdate)
                                .query(sqlQueries.updateEvent);
                return update.rowsAffected[0]

    } catch (error) {
        console.log(error.message);
    }
}
const creatInquiry = async (eventdata) => {
    try {
     
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        let m = new Date();
        let LastUpdate = m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
        const insertEvent = await pool.request()
                            .input('FirstName', eventdata.firstname)
                            .input('LastName', eventdata.lastname)
                            .input('Email', eventdata.email)
                            .input('Phone', eventdata.phone)
                            .input('Created', LastUpdate)
                            .input('EventDate', eventdata.eventdate)
                            
                            .query(sqlQueries.createEvent);                            
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}
module.exports = {
    unsubscribe,
    creatInquiry
}