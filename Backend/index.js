
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

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
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
