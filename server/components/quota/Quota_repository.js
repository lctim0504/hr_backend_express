import LeaveType from "../../model/LeaveType_model.js";
import LeaveRecord from "../../model/LeaveRecord_model.js";
import { Op } from "sequelize";
import sequelize from "../../Database.js";
import Leave from "../../model/LeaveQuota_model.js";

const createQuota = async (data) => {
    return Leave.create(data);
};

const getLeaveQuota = async (gender) => {
    return LeaveType.findAll({
        where: {
            gender: {
                [Op.in]: [1, 3]
            }
        },
        attributes: ['id', 'quota']
    });
};

const getIdLeaveQuota = async (employee_id, year) => {
    return await Leave.findAll({
        where: { employee_id, year }
    });
};
const getIdLeaveTypeQuota = async (employee_id, year) => {
    return await Leave.findAll({
        where: { employee_id, year },
        attributes: ['leave_type_id', 'total_hours']
    });
};
const getLeaveUsed = async (employee_id, year) => {
    //console.log({employee_id, year});
    try {
        const result = await LeaveRecord.findAll({
            where: { employee_id, year },
            attributes: ['leave_type_id', [sequelize.fn('SUM', sequelize.col('hours')), 'total_hours']],
            group: ['leave_type_id'],
            raw: true, // 取得單純的 JSON 物件
        });
        //console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
};

export default { getIdLeaveTypeQuota, getIdLeaveQuota, getLeaveUsed, getLeaveQuota, createQuota, };
