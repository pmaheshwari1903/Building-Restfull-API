import mongoose from 'mongoose'

const sponsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Sponsers Name is Required'],
        trim: true,
        minlength: 2,
        maxlength: 100
    },
},{timestamps:true})

export default mongoose.model('Sponser', sponsersSchema)