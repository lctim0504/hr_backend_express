import Employee from "../../model/Employee_model.js";
import LeaveRecord from "../../model/LeaveRecord_model.js";
import OvertimeRecord from "../../model/OvertimeRecord_model.js";

const getLeaveRecords = async () => {
    const results = await LeaveRecord.findAll({
        where: { sv_permit: 1 },
        include: [
            {
                model: Employee,
                as: 'employee_data',
                attributes: ['name'] // 只查employee的name
            }
        ]
    })
    const records = results.map(result => ({
        employee_id: result.employee_id,
        start_time: result.start_time,
        end_time: result.end_time,
        hours: result.hours,
        leave_type_id: result.leave_type_id,
        reason: result.reason,
        name: result.employee_data.name
    }));
    return records;
};

const getOvertimeRecords = async () => {
    const results = await OvertimeRecord.findAll({
        where: { sv_permit: 1 },
        include: [
            {
                model: Employee,
                as: 'employee_data',
                attributes: ['name'] // 只查employee的name
            }
        ]
    })
    const records = results.map(result => ({
        employee_id: result.employee_id,
        name: result.employee_data.name,
        create_time: result.start_time,
        start_time: result.act_start_time,
        end_time: result.act_end_time,
        hours: result.hours,
        overtime_type_id: result.overtime_type_id,
        reason: result.reason,
    }));
    return records;
};

export default { getOvertimeRecords, getLeaveRecords };

