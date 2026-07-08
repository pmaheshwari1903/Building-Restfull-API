import * as playerService from '../../ipl-ms/services/player.service.js'
import ApiResponse from "../../../common/utils/api-response.js"
import ApiError from "../../../common/utils/api-error.js"


const createPlayer = async(req, res) => {
    const player = await playerService.createPlayer(req.body)
    ApiResponse.created(res,"Player Created Succefully", player)
}

const getAllPlayer = async(req, res) => {
    const player = await playerService.getAllPlayer()
    ApiResponse.ok(res, "Player Data Fetched", player)
}

const transferPlayer = async(req, res) => {
    const player = await playerService.transferPlayer(req.body)
    ApiResponse.ok(res, "Player Team changed Successfully", player)
}

export {
    createPlayer,
    getAllPlayer,
    transferPlayer
}