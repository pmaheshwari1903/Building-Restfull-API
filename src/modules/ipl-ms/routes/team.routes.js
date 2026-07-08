import {Router} from 'express'
import * as controller from '../controller/team.controller.js'

const router = Router()

// create Team
router.post("/", controller.createTeam)

// Get Team
router.get("/", controller.getTeam)

// Get Team by Id
router.get("/:id", controller.getTeamById)

// Update Team
router.put("/:id", controller.updateTeam)

// Delete Team
router.delete("/:id", controller.deleteTeam)


export default router