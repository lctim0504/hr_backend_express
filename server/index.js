import express from "express"
import sql from "mssql"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()

const app = express()
app.use(cors())

// app.use(cors({
//     origin: ['http://localhost:3000']
// }));

const port = 5000;
app.listen(port, () => {
    console.log(`✓ connected to ${port} backend`);
});
//mssql連線
// const config = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     server: process.env.DB_SERVER,
//     database: process.env.DB_NAME,
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//     }
// }
//sequelize
// import { Sequelize } from 'sequelize'
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_SERVER,
//     dialect: 'mssql',
//     logging: false,
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//     }
// });
//mssql連線測試
// sql.connect(config, function (err) {
//     if (err) console.log(err)
//     else {
//         console.log(`✓ connected to ${config.database}`);
//     }
// })
//sequelize連線測試
// try {
//     console.log('✓ connected to sequelize');
//     await sequelize.authenticate();
// } catch (error) {
//     console.error('sequelize authenticate fail', error);
// }
//測試express
// app.use(express.json());
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
// });
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
//測試sequelize
// import UserModel from "./user/User_model.js"
// const User = UserModel(sequelize);
// app.get('/users', async (req, res) => {
//     const users = await User.findAll();
//     res.send(users);
// });

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

app.use(express.json())
app.use("/user", UserController)
app.use("/leave", LeaveController)
app.use("/auth", AuthController)
app.use("/schedule", ScheduleController)
app.use("/item", ItemController)
app.use("/export", ExportController)
app.use("/quota", QuotaController)

export default app




