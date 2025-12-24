// import express from 'express';
// const app = express();
// import dotenv from 'dotenv';
// dotenv.config();
// import cors from 'cors';
// import authRoutes from "./routes/authRoutes.js"

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

// const PORT = process.env.PORT || 5000;

// import connectDB from './config/db.js';
// // import userRoutes from './routes/userRoute.js';

// app.use(express.json());
// //database connection
// connectDB();

// app.get('/',(req,res)=>{
//     res.send('server is running');  
// })

// // define routes

// app.use("/api/auth", authRoutes);



// app.listen(PORT,()=>{
//     console.log(`server is running on port http://localhost:${PORT}`);
// })
process.env.MONGODB_URL = "mongodb://127.0.0.1:27017/CRM-Project";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./.env", debug: true });

const app = express();
const PORT = process.env.PORT || 5000;

// 🔐 CORS
app.use(
  cors({
    origin: "http://localhost:5173",        // Vite default URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,                     // cookie वापरत नाहीस
  })
);

app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
