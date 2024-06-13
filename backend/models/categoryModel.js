import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true
    },
    main:{
        type:String,
        required:true,
    },
    slug1:{
        type:String,
        lowercase:true
    }
})

export default mongoose.model('Cat',categorySchema);










