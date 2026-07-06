import mongoose from 'mongoose'

const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Owner Name is Required'],
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    company:{
        type: String,
        required:[true, 'Company Name is Required'],
        trim: true,
        minlength:2,
        maxlength:100
    }
},{timestamps:true});

export default moongose.model("Owner", ownerSchema);