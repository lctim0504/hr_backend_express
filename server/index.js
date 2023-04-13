import express from "express"
import sql from "mssql"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express()
//app.use(cors())

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors(corsOptions));

const port = 5000;
app.listen(port, () => {
    console.log(`✓ connected to ${port} backend`);
});

import cookieParser from "cookie-parser"
app.use(cookieParser())

//RouteControllers
import UserController from "./components/user/User_controller.js"
import LeaveController from "./components/leave/Leave_controller.js"
import AuthController from "./components/auth/Auth_controller.js"
import ScheduleController from "./components/schedule/Schedule_controller.js"
import ItemController from "./components/item/Item_controller.js"
import ExportController from "./components/export/Export_controller.js"
import QuotaController from "./components/quota/Quota_controller.js"
import OvertimeController from "./components/overtime/Overtime_controller.js"

app.use(express.json())
app.use("/user", UserController)
app.use("/leave", LeaveController)
app.use("/auth", AuthController)
app.use("/schedule", ScheduleController)
app.use("/item", ItemController)
app.use("/export", ExportController)
app.use("/quota", QuotaController)
app.use("/overtime", OvertimeController)

export default app




