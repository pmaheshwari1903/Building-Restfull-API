import * as ownerService from '../../ipl-ms/routes/owner.routes.js'
import ApiResponse from "../../common/utils/api-response.js"
import ApiError from "../../common/utils/api-error.js"


const createOwner = async(req, res) => {
    const owner = await ownerService.createOwner(req.body)
    ApiResponse.created(res,"Owner Created Succefully", owner)
}

const getAllOwner = async(req, res) => {
    const owner = await ownerService.getAllOwner()
    ApiResponse.ok(res,"Owners fetched Successfully", owner)
}

const getOwnerById = async(req, res) => {
    const owner = ownerService.getOwnerById(req.params.id)
    ApiResponse.ok(res, "Owner fetched successfully")
}

const updateOwner = async(req, res) => {
    const updatedOwner = ownerService.updateOwner(req.body.id, req.body)
    ApiResponse.ok(res, "Owner Updated Successfully")
}

const deleteOwner = async(req, res) => {
    const deletedOwner = ownerService.deleteOwner(req.body.id)
    ApiResponse.ok(res, "Owner Deleted Successfully")
}

export {
    createOwner,
    getAllOwner,
    getOwnerById,
    updateOwner,
    deleteOwner
}