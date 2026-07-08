import {Router} from 'express';
import * as controller from '../../ipl-ms/controller/player.controller.js'

const router = Router();

// create a new owner
router.post("/", controller.createPlayer)
router.get("/", controller.getAllPlayer)
router.put("/", controller.transferPlayer)

export default router