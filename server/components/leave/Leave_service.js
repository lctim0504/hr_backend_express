import { Sequelize } from "sequelize";
import leaveRepository from "./Leave_repository.js";
import { transporter } from "../../nodemailer.js";

const catchError = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const updateLeave = catchError(async (req, res) => {
    const body = req.body;
    body.start_time = Sequelize.literal(`Cast('${body.start_time}' as datetime)`);
    body.end_time = Sequelize.literal(`Cast('${body.end_time}' as datetime)`);
    const updatedLeave = await leaveRepository.updateLeave(body.seq, body);
    res.json(updatedLeave);
});

const createLeave = catchError(async (req, res) => {
    const body = req.body;
    body.start_time = Sequelize.literal(`Cast('${body.start_time}' as datetime)`);
    body.end_time = Sequelize.literal(`Cast('${body.end_time}' as datetime)`);
    const newLeave = await leaveRepository.createLeave(body);
    // 取得對應的部門主管
    const supervisorEmail = await leaveRepository.getSupervisorEmailById(newLeave.dataValues.employee_id);
    console.log(supervisorEmail);
    await transporter.sendMail({
        from: 'timlin@dli-memory.com.tw', // 申請人
        to: 'timlin@dli-memory.com.tw', // 部門主管
        subject: '請假申請(自動發信)', // Subject line
        text: supervisorEmail, // plain text body
    });
    res.json(newLeave);
});

const deleteLeave = catchError(async (req, res) => {
    const id = req.params.id;
    await leaveRepository.deleteLeave(id);
    res.json("用戶成功刪除");
});

const getLeave = catchError(async (req, res) => {
    const id = req.params.id;
    const getLeave = await leaveRepository.getLeaveById(id);
    res.json(getLeave);
});

const getAllLeaves = catchError(async (req, res) => {
    const getLeaves = await leaveRepository.getAllLeaves();
    res.json(getLeaves);
});

const getDpmLeave = catchError(async (req, res) => {
    const dpm = req.query.dpm;
    const getDpmLeave = await leaveRepository.getDpmLeave(dpm);
    res.json(getDpmLeave)
});

export default { updateLeave, deleteLeave, getAllLeaves, getLeave, createLeave, getDpmLeave };
