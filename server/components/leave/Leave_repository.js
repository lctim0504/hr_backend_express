import LeaveRecord from "../../model/LeaveRecord_model.js";
import Employee from "../../model/Employee_model.js";

const createLeave = async (data) => {
    return LeaveRecord.create(data);
};

const getDpmLeave = async (dpm) => {
    return LeaveRecord.findAll({
        where: { '$employee_data.department_id$': dpm },
        include: [
            {
                model: Employee,
                as: 'employee_data',
                attributes: ['name', 'department_id'] // 只查employee的name
            }
        ]
    });
};

const getAllLeaves = async () => {
    return LeaveRecord.findAll();
};

const getLeaveById = async (employee_id) => {
    return LeaveRecord.findAll({ where: { employee_id } });
};

const updateLeave = async (seq, data) => {
    const updateResult = await LeaveRecord.update(data, { where: { seq }, returning: true });
    return updateResult[1][0];
};

const deleteLeave = async (seq) => {
    return LeaveRecord.destroy({ where: { seq } });
};

export default { getAllLeaves, getLeaveById, createLeave, updateLeave, deleteLeave, getDpmLeave };
