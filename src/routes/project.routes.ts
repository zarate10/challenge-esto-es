import { Router } from "express";
import { assignProject, createProject, deleteProject, editProject, getAllProjects, getProjectByID, getUsersInProject, searchProjects } from "../controller/project.controller";

const router = Router(); 

/**
 * @swagger 
 * /project/all:
 *  get: 
 *      summary: Obtener listado de proyectos paginado.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: query
 *            name: page
 *            description: Page representa el número actual de página. 
 *            schema:  
 *              type: number
 *          - in: query
 *            name: pageSize
 *            description: pageSize representa la cantidad de elementos que se mostrarán como resultado. 
 *            schema:  
 *              type: number
 *      responses:
 *          200: 
 *              description: Asignar usuario a proyecto. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.get('/all', getAllProjects)
/**
 * @swagger 
 * /project/create:
 *  post: 
 *      summary: Crear proyecto.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: body
 *            schema:  
 *              type: object
 *              description: El status puede ser o 'Enabled' o 'Work in Progress' o 'Finished'.
 *              properties: 
 *                  name: 
 *                      type: string
 *                      description: Nombre del proyecto.
 *                  description:
 *                      type: string
 *                      description: Descripción del proyecto.
 *                  manager:
 *                      type: string
 *                      description: Correo electrónico del manager (debe existir como usuario).
 *                  status:
 *                      type: string
 *                      description: El status puede ser o 'Enabled' o 'Work in Progress' o 'Finished'.
 *                  created_by: 
 *                      type: string
 *                      description: Correo electrónico de usuario (debe existir)
 *      responses:
 *          200: 
 *              description: Proyecto creado correctamente. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.post('/create', createProject)
/**
 * @swagger 
 * /project/update:
 *  put: 
 *      summary: Modificar un proyecto existente.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: body
 *            schema:  
 *              type: object
 *              properties: 
 *                  name: 
 *                      type: string
 *                      description: Nombre del proyecto.
 *                  description:
 *                      type: string
 *                      description: Descripción del proyecto.
 *                  manager:
 *                      type: string
 *                      description: Correo electrónico del manager (debe existir como usuario).
 *                  status:
 *                      type: string
 *                      description: El status puede ser o 'Enabled' o 'Work in Progress' o 'Finished'.
 *      responses:
 *          200: 
 *              description: Proyecto modificado correctamente. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.put('/update', editProject)
/**
 * @swagger 
 * /project/delete:
 *  delete: 
 *      summary: Eliminar un proyecto existente.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: body
 *            schema:  
 *              type: object
 *              properties: 
 *                  name: 
 *                      type: string
 *                      description: Nombre del proyecto.
 *      responses:
 *          200: 
 *              description: Proyecto eliminado correctamente. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.delete('/delete', deleteProject)
/**
 * @swagger 
 * /project/assign:
 *  post: 
 *      summary: Asignar usuario a proyecto.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: body
 *            schema:  
 *              type: object
 *              properties: 
 *                  user: 
 *                      type: string
 *                      description: Correo electrónico de usuario (debe existir).
 *                  project:
 *                      type: string
 *                      description: Nombre de proyecto (debe existir).
 *      responses:
 *          200: 
 *              description: Asignar usuario a proyecto. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.post('/assign', assignProject)
/**
 * @swagger 
 * /project/{id}/users:
 *  get: 
 *      summary: Obtener usuarios de un proyecto.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: path
 *            name: id
 *            description: El id representa el nombre del proyecto. 
 *            schema:  
 *              type: string
 *      responses:
 *          200: 
 *              description: Proyecto obtenido correctamente. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.get('/:id/users', getUsersInProject)
/**
 * @swagger 
 * /project/search?q=$string:
 *  get: 
 *      summary: Buscar proyectos por nombre coincidentes.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: query
 *            name: q
 *            description: q es un string que puede o no representar un nombre específico. 
 *            schema:  
 *              type: string
 *      responses:
 *          200: 
 *              description: Proyectos obtenidos correctamente. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.get('/search', searchProjects)
/**
 * @swagger 
 * /project/{id}:
 *  get: 
 *      summary: Obtener un único proyecto por nombre.
 *      tags: 
 *          - Project
 *      parameters: 
 *          - in: path
 *            name: id
 *            description: El nombre representa el ID de un proyecto. 
 *            schema:  
 *              type: string
 *      responses:
 *          200: 
 *              description: Proyecto obtenido correctamente. 
 *          500: 
 *              description: Error interno del servidor.
 */
router.get('/:id', getProjectByID)

export default router; 