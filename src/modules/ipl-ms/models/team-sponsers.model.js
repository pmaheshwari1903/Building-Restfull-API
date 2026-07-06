// Junction and Mapping Table

import mongoose from "mongoose";

const teamSponserSchema = new mongoose.Schema(
    {
        teamId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: [true, "Team name is Required"]
        },

        sponserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sponser",
            required: [true, "Sponser Name is Required"]
        }
    },
    {
        timestamps: true
    }
)

teamSponserSchema.index({teamId:1, sponserId:1},{unique:true})

export default mongoose.model('Team-Sponser', teamSponserSchema)