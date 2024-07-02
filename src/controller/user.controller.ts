import { Request, Response } from "express";
import { pool } from "../db/connect";

export const getAllUsers = async (_: Request, res: Response) => {
    try {
        const [ rows ] = await pool.query('SELECT firstname, lastname, email FROM duser;')
        res.status(200).json(rows)
    } catch(e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email } = req.body;
        await pool.query('INSERT INTO duser VALUES (?,?,?)', [firstname, lastname, email])
        
        res.status(200).json('user created successfully')
    } catch(e) {
        console.log(e);

        res.status(500).json('An unexpected error occurred in the database.');
    }
}