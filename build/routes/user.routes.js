"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /user/all:
 *  get:
 *      summary: Obtener listado de usuarios.
 *      tags:
 *          - User
 *      responses:
 *          200:
 *              description: Listado de usuarios obtenido con éxito.
 *          500:
 *              description: Error interno del servidor.
 */
router.get('/all', user_controller_1.getAllUsers);
router.post('/create', user_controller_1.createUser);
exports.default = router;
