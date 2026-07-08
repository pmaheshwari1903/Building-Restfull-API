import {Router} from 'express';
import * as controller from '../../ipl-ms/controller/owner.controller.js'

const router = Router();

// create a new owner
router.post("/", controller.createOwner)

// Get All Owner
router.get("/", controller.getAllOwner)

// Get Owner from Id
router.get("/:id", controller.getOwnerById)

// Update Owner
router.put("/:id", controller.updateOwner)

// Delete Owner
router.delete("/:id", controller.deleteOwner)

