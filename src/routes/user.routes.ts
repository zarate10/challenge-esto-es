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
/**
 * @swagger 
 * /user/create:
 *  post: 
 *      summary: Crear usuario.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: body
 *            schema:  
 *              type: object
 *              properties: 
 *                  firstname: 
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                      description: En base a este atributo se indexará todo. 
 *      responses:
 *          200: 
 *              description: Usuario creado correctamente. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.post('/create', createUser)

export default router; 