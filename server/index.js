import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import controllers from "./controllers.js"
import { loggerMiddleware } from "./middleware/logger.js"
import { corsOptions } from "./middleware/cors.js"

dotenv.config()
const app = express()

// 設置中間件
app.use(morgan('combined'))
app.use(loggerMiddleware)

app.use(corsOptions)

app.use(cookieParser())
app.use(express.json())

// 設置路由
app.use("/user", controllers.UserController)
app.use("/leave", controllers.LeaveController)
app.use("/auth", controllers.AuthController)
app.use("/schedule", controllers.ScheduleController)
app.use("/item", controllers.ItemController)
app.use("/export", controllers.ExportController)
app.use("/quota", controllers.QuotaController)
app.use("/overtime", controllers.OvertimeController)

// 啟動 server
const port = 5000
app.listen(port, () => {
    console.log(`✓ connected to ${port} backend`)
})

// 設置錯誤處理程序
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send("Something broke!")
})

export default app





