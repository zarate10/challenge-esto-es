import { Router } from "express";
import userRoutes from "./user.routes";
import projectRoutes from "./project.routes";

const router = Router(); 

router.use('/user', userRoutes)
router.use('/project', projectRoutes)

export default router; 