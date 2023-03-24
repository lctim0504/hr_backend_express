import { Sequelize } from "sequelize";
import { catchError } from "../../common/catchError.js";
import { employeeSchema, postEmployeeSchema } from "../../schema/Employee_schema.js";
import userRepository from "./User_repository.js";

const getLeavequota = catchError(async (req, res) => {
    const id = req.params.id;
    //取得初始扣打
    const leavequota = await userRepository.getLeavequota(id);
    const date1 = Sequelize.literal(`Cast('${'2022-01-01'}' as datetime)`);
    const date2 = Sequelize.literal(`Cast('${'2022-12-31'}' as datetime)`);
    //計算請假時數
    const leaveUsed = await userRepository.getLeaveUsed(id, date1, date2);
    // console.log(leavequota);
    // console.log('--------------------------------------');
    // console.log(leaveUsed);
    const result = leaveUsed.map(item => {
        const diff = leavequota[item.leave_type_id.toString()] - item.total_hours;
        console.log(leavequota[item.leave_type_id.toString()]);
        console.log('--------------------------------------');
        console.log(item.total_hours);
        return { leave_type_id: item.leave_type_id, diff };
    });
    return res.status(200).json(result);
});


const getUser = catchError(async (req, res) => {
    const id = req.params.id;
    const getUser = await userRepository.getUserById(id);
    if (getUser == null) {
        res.status(404).send()
    } else {
        res.status(200).json(getUser);
    }
});

const getAllUsers = catchError(async (req, res) => {
    const getUsers = await userRepository.getAllUsers();
    res.status(200).json(getUsers);
});

const updateUser = catchError(async (req, res) => {
    const id = req.params.id;
    const { employee_id, ...rest } = req.body; // 從body中取出employee_id和其他資料
    const body = await postEmployeeSchema.validateAsync(rest);

    const userExisted = await userRepository.getUserById(id);
    if (!userExisted) {
        res.status(400).json({ error: "查無使用者資料" })
    }
    else {
        const updatedUser = await userRepository.updateUser(id, body);
        res.status(200).json(updatedUser);
    }
});

const createUser = catchError(async (req, res) => {
    const body = await employeeSchema.validateAsync(req.body);
    const userExisted = await userRepository.getUserById(body.employee_id);

    if (userExisted) {
        res.status(400).json({ error: "使用者已存在" })
    }
    else {
        const newUser = await userRepository.createUser(body);
        res.status(201).json(newUser);
    }
});

const deleteUser = catchError(async (req, res) => {
    const id = req.params.id;
    const success = await userRepository.deleteUser(id);
    if (success) {
        res.sendStatus(204);
    } else {
        res.status(400).json({ error: "查無使用者資料" });
    }
});

export default { updateUser, deleteUser, getAllUsers, getUser, createUser, getLeavequota };
