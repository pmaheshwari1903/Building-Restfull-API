import * as ownerService from '../../ipl-ms/services/owner.service.js'
import ApiResponse from "../../../common/utils/api-response.js"
import ApiError from "../../../common/utils/api-error.js"


const createOwner = async(req, res) => {
    const owner = await ownerService.createOwner(req.body)
    ApiResponse.created(res,"Owner Created Succefully", owner)
}

const getAllOwner = async(req, res) => {
    const owner = await ownerService.getAllOwner()
    ApiResponse.ok(res,"Owners fetched Successfully", owner)
}

const getOwnerById = async(req, res) => {
    const owner = await ownerService.getOwnerById(req.params.id)
    ApiResponse.ok(res, "Owner fetched successfully", owner)
}

const updateOwner = async(req, res) => {
    const updatedOwner = await ownerService.updateOwner(req.params.id, req.body)
    ApiResponse.ok(res, "Owner Updated Successfully", updateOwner)
}

const deleteOwner = async(req, res) => {
    const deletedOwner = await ownerService.deleteOwner(req.body.id)
    ApiResponse.ok(res, "Owner Deleted Successfully")
}

export {
    createOwner,
    getAllOwner,
    getOwnerById,
    updateOwner,
    deleteOwner
}