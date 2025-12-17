import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
app.use(cors());

const PORT = process.env.PORT || 8000;

import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';



app.use(express.json());

//database connection
connectDB();

app.get('/',(req,res)=>{
    res.send('server is running');  
})

// define routes

app.use('/api/users',userRoutes);



app.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
})