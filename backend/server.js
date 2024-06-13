import express from 'express';
import authRoutes from './Routes/authRoutes.js'
import categoryRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import ConnectDb from './DBconnection/Db.js';
import cors from 'cors';
import dotenv from 'dotenv';
const App = express();
dotenv.config()
// data base call
ConnectDb();
// middlewares
App.use(cors()); // to connect frontend to backend
App.use(express.json());
// Routes
App.use('/api/v1/auth',authRoutes);
App.use('/api/v1/category',categoryRoutes);
App.use('/api/v1/product',productRoutes);
//port connection
const PORT = process.env.PORT || 5000;
App.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
