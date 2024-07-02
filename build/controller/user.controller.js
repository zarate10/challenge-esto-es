"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const connect_1 = require("../db/connect");
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield connect_1.pool.query('SELECT firstname, lastname, email FROM user;');
        res.status(200).json(rows);
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email } = req.body;
        yield connect_1.pool.query('INSERT INTO user VALUES (?,?,?)', [firstname, lastname, email]);
        res.status(200).json('user created successfully');
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.createUser = createUser;
