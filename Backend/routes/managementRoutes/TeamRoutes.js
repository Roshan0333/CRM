import express, { Router } from 'express'

import { isManager } from '../../middlewares/RoleMiddleware.js';
import { count, createTeam, deleteTeamMember, getTeamMembers, updateTeam } from '../../controllers/managementControllers/TeamControllers.js';
import isAuth from '../../middlewares/AuthMiddleware.js';




const teamRouter = Router()

teamRouter.post( "/create",isManager,createTeam);
teamRouter.put("/update/:id",isManager,updateTeam)
teamRouter.get("/getTeamMembers",getTeamMembers)
teamRouter.delete("/delete/:id", deleteTeamMember);
teamRouter.get("/management",isManager,count)


export default teamRouter
