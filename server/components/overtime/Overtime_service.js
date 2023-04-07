import { Sequelize } from "sequelize";
import overtimeRepository from "./Overtime_repository.js";
import { transporter } from "../../nodemailer.js";
import { createOvertimeRecordSchema, updateBulkOvertimeRecordSchema, updateOvertimeRecordSchema } from "../../schema/OvertimeRecord_schema.js";
import { catchError } from "../../common/catchError.js";
import { timeParser } from "../../common/timeParser.js";

const createOvertime = catchError(async (req, res) => {
    const body = await createOvertimeRecordSchema.validateAsync(req.body);

    body.start_time = Sequelize.literal(`Cast('${timeParser(body.start_time)}' as datetime)`);
    body.end_time = Sequelize.literal(`Cast('${timeParser(body.end_time)}' as datetime)`);
    body.create_time = Sequelize.literal(`Cast('${timeParser(new Date())}' as datetime)`);

    console.log(body);
    const newOvertime = await overtimeRepository.createOvertime(body);
    // 取得對應的部門主管
    const supervisorEmail = await overtimeRepository.getSupervisorEmailById(newOvertime.dataValues.employee_id);
    console.log(supervisorEmail);
    // await transporter.sendMail({
    //     from: 'timlin@dli-memory.com.tw', // 申請人
    //     to: 'timlin@dli-memory.com.tw', // 部門主管
    //     subject: '請假申請(自動發信)', // Subject line
    //     text: supervisorEmail, // plain text body
    // });
    res.json(newOvertime);
});

const deleteOvertime = catchError(async (req, res) => {
    const seq = req.params.id;
    await overtimeRepository.deleteOvertime(seq);
    res.json("資料成功刪除");
});

const getOvertime = catchError(async (req, res) => {
    const id = req.params.id;
    const getOvertime = await overtimeRepository.getOvertimeById(id);
    res.json(getOvertime);
});

const getAllOvertimes = catchError(async (req, res) => {
    const getOvertimes = await overtimeRepository.getAllOvertimes();
    res.json(getOvertimes);
});

const getFilterOvertime = catchError(async (req, res) => {
    const params = {
        department_id: req.query.department_id,
        employee_id: req.query.employee_id,
        overtime_type_id: req.query.overtime_type_id,
    };
    //console.log(params);
    const getFilterOvertime = await overtimeRepository.getFilterOvertime(params);
    res.json(getFilterOvertime)
});
const updateOvertime = catchError(async (req, res) => {
    const body = await updateOvertimeRecordSchema.validateAsync(req.body);
    body.permit_time = Sequelize.literal(`Cast('${now}' as datetime)`);

    const updatedOvertime = await overtimeRepository.updateOvertime(body.seq, body);
    res.json(updatedOvertime);
});
const updateBulkOvertime = catchError(async (req, res) => {
    console.log(req.body.data.ids);
    //const updatedOvertime = await overtimeRepository.updateOvertime(body);
    res.json('');
});
export default { updateOvertime, updateBulkOvertime, deleteOvertime, getAllOvertimes, getOvertime, createOvertime, getFilterOvertime };
