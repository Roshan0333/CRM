
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env", debug: true });
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/salesDepartment/client.route.js";
import salesRoutes from './routes/salesDepartment/sales.route.js';
import callLogRoutes from './routes/salesDepartment/callHistory.route.js';
// <<<<<<< Updated upstream
import auth from "./middlewares/AuthMiddleware.js"
// =======

import path from "path";


// >>>>>>> Stashed changes
import reminderCallRoutes from "./routes/salesDepartment/todayReminderCall.route.js"
import salesTeamRoutes from "./routes/salesDepartment/salesTeam.route.js";
import clientLeadRoutes from "./routes/salesDepartment/clientLeads.route.js";

import totalSalesRoutes from "./routes/SalesTeam/totalSalesRoutes.js";
import untouchedRoutes from "./routes/SalesTeam/untouchedRoutes.js";
import prospectRoutes from "./routes/SalesTeam/prospectRoutes.js";
import salesTeamLeadRoutes from "./routes/SalesTeam/salesTeamLeadRoutes.js";

// <<<<<<< Updated upstream
import FeedbackRoutes from './routes/feedbackRoutes/FeedbackRoutes.js';
import ComplaintRoutes from './routes/feedbackRoutes/ComplaintRoutes.js';
import TeamRoutes from './routes/feedbackRoutes/TeamRoutes.js'; 
// =======
// import auth from "./middlewares/AuthMiddleware.js";
import teamRouter from "./routes/managementRoutes/TeamRoutes.js";
// import isAuth from "./middlewares/AuthMiddleware.js";


import invoiceRoutes from "./routes/FinanceDepartment/invoice.routes.js";
import upload from "./middlewares/Finance/upload.js";
import financeRoutes from "./routes/FinanceDepartment/finance.routes.js";


dotenv.config({ path: "./.env", debug: true });
// >>>>>>> Stashed changes

const app = express();

const PORT = process.env.PORT || 5000;

// 🔐 CORS
app.use(
  cors({
    origin: "http://localhost:5173",       
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,                     
  })
);

app.use(express.json());
connectDB();

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// <<<<<<< Updated upstream
app.use("/api/clientLead", clientLeadRoutes)
// =======

// >>>>>>> Stashed changes
app.use("/api/client", clientRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/calllog", callLogRoutes)
app.use("/api/remindercall", reminderCallRoutes);
app.use("/api/salesTeam", salesTeamRoutes);

app.use("/api/salesTeamLead", salesTeamLeadRoutes);
app.use("/api/prospects", prospectRoutes);
app.use("/api/total-sales", totalSalesRoutes);
app.use("/api/untouched", untouchedRoutes);
app.use("/api/client",auth, clientRoutes);
app.use("/api/sales",auth, salesRoutes);
app.use("/api/calllog",auth, callLogRoutes);
app.use("/team",auth,teamRouter);
app.use("/api/finance", financeRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/invoice", invoiceRoutes);



app.use("/api/feedback", FeedbackRoutes);
app.use("/api/complaints", ComplaintRoutes);
app.use("/api/team-members", TeamRoutes )

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
