import mongoose from "mongoose";
const ConnectDb = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`connect to Database ${conn.connection.host}`);
    } catch (error){
        console.log("This is database error",error)
    }
}
export default ConnectDb;
