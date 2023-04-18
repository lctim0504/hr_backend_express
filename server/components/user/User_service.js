import { Sequelize } from "sequelize";
import { catchError } from "../../common/catchError.js";
import { employeeSchema, postEmployeeSchema,updateEmployeeSchema } from "../../schema/Employee_schema.js";
import userRepository from "./User_repository.js";

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
    const body = await updateEmployeeSchema.validateAsync(rest);

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
    if (success) res.sendStatus(204);
    else res.status(400).json({ error: "查無使用者資料" });
});
const deleteBulkUser = catchError(async (req, res) => {
    const ids = req.query.id;
    await userRepository.deleteBulkUser(ids);
    res.status(200).json("用戶成功刪除");
});
export default { updateUser, deleteUser, deleteBulkUser, getAllUsers, getUser, createUser, };
