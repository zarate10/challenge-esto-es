import { Router } from "express";
import { createUser, getAllUsers } from "../controller/user.controller";

const router = Router(); 

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
router.get('/all', getAllUsers)

router.post('/create', createUser)

export default router; 