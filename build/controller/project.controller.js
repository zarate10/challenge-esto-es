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
exports.getProjectByID = exports.searchProjects = exports.getUsersInProject = exports.assignProject = exports.deleteProject = exports.editProject = exports.createProject = exports.getAllProjects = void 0;
const connect_1 = require("../db/connect");
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 3;
    const offset = (page - 1) * pageSize;
    try {
        const [total] = yield connect_1.pool.query('SELECT COUNT(*) as total FROM project');
        const [rows] = yield connect_1.pool.query('SELECT name, status, description, created_by, created_at, manager FROM project LIMIT ?, ?', [offset, pageSize]);
        const usersMap = yield mapUsers2Project(rows);
        const totalPages = Math.ceil(total[0].total / pageSize);
        res.status(200).json({
            page,
            pageSize,
            offset,
            totalPages,
            results: usersMap
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.getAllProjects = getAllProjects;
// El usuario puede crear proyectos. 
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, manager, status, created_by } = req.body;
    try {
        yield connect_1.pool.query('INSERT INTO project (name, description, manager, status, created_by) VALUES (?,?,?,?,?)', [
            name,
            description,
            manager,
            status,
            created_by
        ]);
        res.status(200).json('project created successfully');
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.createProject = createProject;
// El usuario puede editar proyectos. 
const editProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, manager, status } = req.body;
    try {
        const [project] = yield connect_1.pool.query('SELECT * FROM project WHERE name=?', [name]);
        if (project.length === 0) {
            res.send(400).json('non existent project');
        }
        else {
            yield connect_1.pool.query('UPDATE project SET name=?, description=?, manager=?, status=? WHERE name=?', [
                name || project[0].name,
                description || project[0].description,
                manager || project[0].manager,
                status || project[0].status,
                name
            ]);
            res.status(200).json('project updated successfully');
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.editProject = editProject;
// El usuario puede eliminar proyectos.
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        yield connect_1.pool.query('DELETE FROM project WHERE name=?', [name]);
        res.status(200).json('project deleted successfully');
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.deleteProject = deleteProject;
// El usuario puede asignar proyectos a usuarios. 
const assignProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, project } = req.body;
    try {
        yield connect_1.pool.query('INSERT INTO user_project VALUES (?,?)', [user, project]);
        res.status(200).json('user added successfully');
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.assignProject = assignProject;
const getUsersInProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const users = yield usersInProject(id);
        res.status(200).json(users);
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.getUsersInProject = getUsersInProject;
const searchProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query.q;
    try {
        const searchName = `%${q}%`;
        const [rows] = yield connect_1.pool.query('SELECT name, status, description, created_by, created_at FROM project WHERE name LIKE ?', [searchName]);
        const usersMap = yield mapUsers2Project(rows);
        res.status(200).json(usersMap);
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.searchProjects = searchProjects;
// Traer un solo proyecto /id
const getProjectByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [rows] = yield connect_1.pool.query('SELECT name, status, description, created_by, created_at FROM project WHERE name=?', [id]);
        res.status(200).json(Object.assign(Object.assign({}, rows[0]), { users: yield usersInProject(id) }));
    }
    catch (e) {
        console.log(e);
        res.status(500).json('An unexpected error occurred in the database.');
    }
});
exports.getProjectByID = getProjectByID;
// utils ctrl 
const usersInProject = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connect_1.pool.query('SELECT user FROM user_project WHERE project=?', [name]);
    try {
        let users = [];
        rows.forEach((el) => {
            users.push(el.user);
        });
        return users;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
const mapUsers2Project = (rows) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectsWithUsers = yield Promise.all(rows.map((project) => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield usersInProject(project.name);
            project['users'] = users;
            return project;
        })));
        return projectsWithUsers;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
