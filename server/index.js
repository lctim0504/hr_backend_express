import express from "express"
import sql from "mssql"
import dotenv from "dotenv"

dotenv.config()
const app = express()

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

//RouteControllers
import UserContoller from "./components/user/User_controller.js"
import LeaveController from "./components/leave/Leave_controller.js"
app.use(express.json())
app.use("/users", UserContoller)
app.use("/leaves", LeaveController)



