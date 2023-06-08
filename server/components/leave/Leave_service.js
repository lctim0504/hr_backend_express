import { Sequelize } from "sequelize";
import leaveRepository from "./Leave_repository.js";
import { createLeaveRecordSchema, updateBulkLeaveRecordSchema, updateLeaveRecordSchema } from "../../schema/LeaveRecord_schema.js";
import { catchError } from "../../common/catchError.js";
import { timeParser } from "../../common/timeParser.js";
import { transporter } from "../../middleware/nodemailer.js";

const now = new Date().toISOString().slice(0, 19).replace('T', ' ');



const createLeave = catchError(async (req, res) => {
    const body = await createLeaveRecordSchema.validateAsync(req.body);

    body.start_time = Sequelize.literal(`Cast('${timeParser(body.start_time)}' as datetime)`);
    body.end_time = Sequelize.literal(`Cast('${timeParser(body.end_time)}' as datetime)`);
    body.create_time = Sequelize.literal(`Cast('${timeParser(new Date())}' as datetime)`);

    const newLeave = await leaveRepository.createLeave(body);
    // 取得對應的部門主管
    const supervisorEmail = await leaveRepository.getSupervisorEmailById(newLeave.dataValues.employee_id);
    //console.log(supervisorEmail);
    // await transporter.sendMail({
    //     from: 'timlin@dli-memory.com.tw', // 申請人
    //     to: 'timlin@dli-memory.com.tw', // 部門主管
    //     subject: '請假申請(自動發信)', // Subject line
    //     text: supervisorEmail, // plain text body
    // });
    res.json(newLeave);
});

const deleteLeave = catchError(async (req, res) => {
    const seq = req.params.seq;
    await leaveRepository.deleteLeave(seq);
    res.json("資料成功刪除");
});

const deleteBulkLeave = catchError(async (req, res) => {
    const seq = req.query.seq;
    await leaveRepository.deleteBulkLeave(seq);
    res.json("資料成功刪除");
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

const getFilterLeave = catchError(async (req, res) => {
    const params = {
        department_id: req.query.department_id,
        employee_id: req.query.employee_id,
        leave_type_id: req.query.leave_type_id,
    };
    //console.log(params);
    const getFilterLeave = await leaveRepository.getFilterLeave(params);
    res.json(getFilterLeave)
});
const updateLeave = catchError(async (req, res) => {
    const seq = req.params.seq;
    const body = await updateLeaveRecordSchema.validateAsync(req.body);
    body.permit_time = Sequelize.literal(`Cast('${now}' as datetime)`);

    const updatedLeave = await leaveRepository.updateLeave(seq, body);
    res.json(updatedLeave);
});
const updateBulkLeave = catchError(async (req, res) => {
    const seq = req.query.seq;
    const data = req.body;
    const updatedLeave = await leaveRepository.updateBulkLeave(seq, data);
    res.json(updatedLeave);
});

export default { updateLeave, updateBulkLeave, deleteLeave, deleteBulkLeave, getAllLeaves, getLeave, createLeave, getFilterLeave };

