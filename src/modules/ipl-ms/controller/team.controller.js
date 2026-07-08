import * as teamService from '../services/team.service.js'
import ApiError from '../../../common/utils/api-error.js'
import ApiResponse from '../../../common/utils/api-response.js'

const createTeam = async (req, res) => {
    const team = teamService.createTeam(req.body)
    ApiResponse.created(res, "Team Created Successfully",team)
}

const getTeam = async(req, res) => {
    const team = await teamService.getTeam()
    ApiResponse.ok(res, "Team Data Fetched!", team)
}

const getTeamById = async(req, res) => {
    const team = await teamService.getTeamById(req.params.id)
    ApiResponse.ok(res, "Team Data Fetched!", team)
}

const updateTeam = async(req, res) => {
    const updatedTeam = await teamService.updateTeam(req.params.id, req.body)
    ApiResponse.ok(res, "Team Updated Successfully!", updatedTeam)
}

const deleteTeam = async(req, res) => {
    const deletedTeam = await teamService.deleteTeam(req.params.id)
    ApiResponse.ok(res, "Team Deleted Successfully!")
}

export {
    createTeam,
    getTeam,
    getTeamById,
    updateTeam,
    deleteTeam
}