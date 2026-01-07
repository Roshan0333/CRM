
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/salesDepartment/client.route.js";
import salesRoutes from './routes/salesDepartment/sales.route.js';
import callLogRoutes from './routes/salesDepartment/callHistory.route.js';
import reminderCallRoutes from "./routes/salesDepartment/todayReminderCall.route.js"
import salesTeamRoutes from "./routes/salesDepartment/salesTeam.route.js";

import totalSalesRoutes from "./routes/SalesTeam/totalSalesRoutes.js";
import untouchedRoutes from "./routes/SalesTeam/untouchedRoutes.js";
import prospectRoutes from "./routes/SalesTeam/prospectRoutes.js";
import salesTeamLeadRoutes from "./routes/SalesTeam/salesTeamLeadRoutes.js";


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
app.use("/api/users", userRoutes);

app.use("/api/client", clientRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/calllog", callLogRoutes)
app.use("/api/remindercall", reminderCallRoutes);
app.use("/api/salesTeam", salesTeamRoutes);

app.use("/api/salesTeamLead", salesTeamLeadRoutes);
app.use("/api/prospects", prospectRoutes);
app.use("/api/total-sales", totalSalesRoutes);
app.use("/api/untouched", untouchedRoutes);


app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
