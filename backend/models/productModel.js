import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false,
    },
    slug:{
        type:String,
        required:true,
        unique:false
    },
    discription:{
        type : String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    mainCategory:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Cat",
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean,
    }
},{
    timestamps: true
})
export default  mongoose.model("Products" ,productSchema);