import mongoose from 'mongoose'

const broadcasterSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "BroadCaster Name is Required"],
            trim: true,
            minlength: 2,
            maxlength: 100
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Broadcaster', broadcasterSchema)
