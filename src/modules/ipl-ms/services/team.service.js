import Team from '../models/teams.model.js'
import ApiError from '../../../common/utils/api-error.js'

const createTeam = async({name}) => {
    const team = await Team.create({name})
    return team
}

const getTeam = async() => {
    const team = await Team.find()
    return team
}

const getTeamById = async(userId) => {
    const team = await Team.findById(userId)
    if (!team) throw ApiError.notfound("Team not found")
    return team
}

const updateTeam = async(userId, {name}) => {
    const team = await Team.findByIdAndUpdate(
        userId,
        {name},
        {new:true, runValidators:true}
    )
    if(!team) throw ApiError.notfound("Team not found")
    return team
}

const deleteTeam = async(userId) => {
    const team = await Team.findByIdAndDelete(userId)
    if(!team) throw ApiError.notfound("Team Not Found")
    return team
}

export {
    createTeam,
    getTeam,
    getTeamById,
    updateTeam,
    deleteTeam
}