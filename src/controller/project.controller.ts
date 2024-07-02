import { Request, Response } from "express";
import { pool } from "../db/connect";
import { RowDataPacket } from "mysql2/promise";

export const getAllProjects = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 3; 
    const offset = (page - 1) * pageSize;
    try {
        const [ total ] = await pool.query('SELECT COUNT(*) as total FROM project'); 

        const [ rows ] = await pool.query(
            'SELECT name, status, description, created_by, created_at, manager FROM project LIMIT ?, ?', 
            [offset, pageSize])
        
        const usersMap = await mapUsers2Project(rows)

        const totalPages = Math.ceil(total[0].total / pageSize);

        res.status(200).json({
            page, 
            pageSize, 
            offset, 
            totalPages,
            results: usersMap 
        })
    } catch(e){
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

// El usuario puede crear proyectos. 
export const createProject = async (req: Request, res: Response) => {
    const { name, description, manager, status, created_by } = req.body; 
    try {
        await pool.query('INSERT INTO project (name, description, manager, status, created_by) VALUES (?,?,?,?,?)', [
            name, 
            description,
            manager, 
            status,
            created_by
        ]);
        res.status(200).json('project created successfully')
    } catch(e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

// El usuario puede editar proyectos. 
export const editProject = async (req: Request, res: Response) => {
    const { name, description, manager, status } = req.body; 
    try {
        const [ project ] = await pool.query('SELECT * FROM project WHERE name=?', [name])

        if (project.length === 0) {
            res.send(400).json('non existent project')
        } else {            

            await pool.query('UPDATE project SET name=?, description=?, manager=?, status=? WHERE name=?', [
                    name || project[0].name,
                    description || project[0].description, 
                    manager || project[0].manager, 
                    status || project[0].status, 
                    name
                ]
            ); 

            res.status(200).json('project updated successfully')
        }
    } catch(e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

// El usuario puede eliminar proyectos.
export const deleteProject = async (req: Request, res: Response) => {
    const { name } = req.body; 
    try {
        await pool.query('DELETE FROM project WHERE name=?', [name])
        res.status(200).json('project deleted successfully')
    } catch(e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

// El usuario puede asignar proyectos a usuarios. 
export const assignProject = async (req: Request, res: Response) => {
    const { user, project } = req.body; 
    try {
        await pool.query('INSERT INTO user_project VALUES (?,?)', [user, project])
        
        res.status(200).json('user added successfully')
    } catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

export const getUsersInProject = async (req: Request, res: Response) => {
    const { id } = req.params;    
    try {
        const users = await usersInProject(id)
    
        res.status(200).json(users)
    } catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

export const searchProjects = async (req: Request, res: Response) => {
    const q = req.query.q as string; 
    try {
        const searchName = `%${q}%`;      

        const [ rows ] = await pool.query('SELECT name, status, description, created_by, created_at FROM project WHERE name LIKE ?', [searchName])
        const usersMap = await mapUsers2Project(rows)

        res.status(200).json(usersMap);
    } catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

// Traer un solo proyecto /id
export const getProjectByID = async (req: Request, res: Response) => {
    const { id } = req.params;       
    
    try {
        const [ rows ] = await pool.query('SELECT name, status, description, created_by, created_at FROM project WHERE name=?', [id])

        res.status(200).json({...rows[0], users: await usersInProject(id)})
    } catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

// utils ctrl 
const usersInProject = async (name: string) => {
    const [ rows ] = await pool.query('SELECT user FROM user_project WHERE project=?', [name])
    try {
        let users: string[] = []
        
        rows.forEach((el: { user: string; }) => {
            users.push(el.user)
        })
        
        return users
    } catch(e){
        console.log(e);
        return []
    }
}

const mapUsers2Project = async (rows: RowDataPacket[]) => {
    try {
        const projectsWithUsers = await Promise.all(
            rows.map(async (project) => {
                const users = await usersInProject(project.name);
                project['users'] = users;
                return project;
            })
        );        
        return projectsWithUsers
    } catch(e){
        console.log(e);
        return []
    }
}
