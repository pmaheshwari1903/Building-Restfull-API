import Player from "../../ipl-ms/models/players.model.js"
import Team from "../../ipl-ms/models/teams.model.js"
import ApiError from "../../../common/utils/api-error.js"

const createPlayer = async ({name, role, teamId}) => {
    const player = await Player.create({name, role, teamId});
    return player;
}

const getAllPlayer = async () => {
    const owner = await Player.find();
    return owner
}

const transferPlayer = async ({playerId, newTeamId}) => {
    const team = await Team.findById(newTeamId);

    if(!team) throw ApiError.notfound("Team Not Found")

    const player = await Player.findByIdAndUpdate(
        playerId,
        {teamId: newTeamId},
        {new:true, runValidators: true}
    ).populate("teamId","name")

    if(!player) throw ApiError.notfound("Player Not Found")

    return player
}

export {
    createPlayer,
    getAllPlayer,
    transferPlayer
}