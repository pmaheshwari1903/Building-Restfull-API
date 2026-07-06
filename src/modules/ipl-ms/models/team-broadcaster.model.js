// Junction and Mapping Table

import mongoose from "mongoose";

const teamBroadcasterSchema = new mongoose.Schema(
    {
        teamId : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Team",
            required:[true, "Team is required"]
        },
        broadcasterId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Broadcaster",
            required:[true,"Broadcaster is required"]
        }
    },
    {
        timestamps: true
    }
)

teamBroadcasterSchema.index({teamId:1, sponsorId:1}, {unique: true})

export default mongoose.model("Team-Broadcaster", teamBroadcasterSchema)