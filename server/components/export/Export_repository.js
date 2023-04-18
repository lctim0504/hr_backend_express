import Employee from "../../model/Employee_model.js";
import LeaveRecord from "../../model/LeaveRecord_model.js";

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

export default { getLeaveRecords };

