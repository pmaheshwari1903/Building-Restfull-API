import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "Team Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        
        ownerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Owner"
        },
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Team",teamSchema)