import Owner from "../../ipl-ms/models/owner.model.js"
import ApiError from "../../../common/utils/api-error.js"

const createOwner = async ({name, company}) => {
    const owner = await Owner.create({name, company});
    return owner;
}

const getAllOwner = async () => {
    const owner = await Owner.find();
    return owner
}

const getOwnerById = async(userId) => {
    const owner = await Owner.findById(userId);
    if(!owner) throw ApiError.notfound("Owner Not Found")
    return owner
}

const updateOwner = async(userId, {name, company}) => {
    const owner = await Owner.findByIdAndUpdate(
        userId,
        {name, company},
        {new: true, runValidators:true}
    )

    if(!owner) throw ApiError.notfound("Owner Not Found")
    return owner
}

const deleteOwner = async(userId) => {
    const owner = await Owner.findByIdAndDelete(userId)
    if(!owner) throw ApiError.notfound("Owner Not Found")
    return owner
}


export {
    createOwner,
    getAllOwner,
    getOwnerById,
    updateOwner,
    deleteOwner
}