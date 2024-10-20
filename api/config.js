'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, MANAGER_SQL_USER, MANAGER_SQL_PASSWORD, MANAGER_SQL_DATABASE, MANAGER_SQL_SERVER} = process.env;
const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

assert(PORT, 'PORT is require');
assert(HOST, 'HOST is required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        primary: {
            server: SQL_SERVER,
            database: SQL_DATABASE,
            user: SQL_USER,
            password: SQL_PASSWORD,
            options: {
                encrypt: sqlEncrypt,
                enableArithAbort: true
            },
        },
        secondary: {
            server: MANAGER_SQL_SERVER,
            database: MANAGER_SQL_DATABASE,
            user: MANAGER_SQL_USER,
            password: MANAGER_SQL_PASSWORD,
            options: {
                encrypt: sqlEncrypt,
                enableArithAbort: true,
            },
        }
    },
};