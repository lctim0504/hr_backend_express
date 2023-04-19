import { Sequelize } from "sequelize";
import overtimeRepository from "./Overtime_repository.js";
import { transporter } from "../../nodemailer.js";
import { catchError } from "../../common/catchError.js";
import { SQLtimeParser, now } from "../../common/timeParser.js";
import { createOvertimeSchema, updateOvertimeSchema } from "../../schema/OvertimeRecord_schema.js";

const createOvertime = catchError(async (req, res) => {
    const body = await createOvertimeSchema.validateAsync(req.body);

    const data = {
        ...body,
        last_update_time: SQLtimeParser(now),
        start_time: SQLtimeParser(body.start_time),
        end_time: SQLtimeParser(body.end_time),
        year: new Date().getFullYear(),
    };
    const newOvertime = await overtimeRepository.createOvertime(data);

    res.json(newOvertime);
});

const deleteOvertime = catchError(async (req, res) => {
    const seq = req.params.seq;
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
    const seq = req.params.seq;
    const body = await updateOvertimeSchema.validateAsync(req.body);

    if (body.act_start_time == true) {
        const data = {
            ...body,
            last_update_time: SQLtimeParser(now),
            act_start_time: SQLtimeParser(body.act_start_time),
            act_end_time: SQLtimeParser(body.act_end_time),
            year: body.year,
        };
    } else {
        const data = {
            ...body,
            last_update_time: SQLtimeParser(now),
            permit_time: SQLtimeParser(now),
            sv_permit: body.sv_permit,
        };
    }

    const updatedOvertime = await overtimeRepository.updateOvertime(seq, data);
    res.json(updatedOvertime);
});

const updateBulkOvertime = catchError(async (req, res) => {
    const seq = req.query.seq;
    const data = req.body;
    const updatedOvertime = await overtimeRepository.updateBulkOvertime(seq, data);
    res.json(updatedOvertime);
});
const deleteBulkOvertime = catchError(async (req, res) => {
    const seq = req.query.seq;
    await overtimeRepository.deleteBulkOvertime(seq);
    res.json("資料成功刪除");
});
export default { updateOvertime, updateBulkOvertime, deleteBulkOvertime, deleteOvertime, getAllOvertimes, getOvertime, createOvertime, getFilterOvertime };
