"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "backestoes"
});
exports.pool = pool;
