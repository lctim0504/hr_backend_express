import Department from "../../model/Department_model.js";
import Employee from "../../model/Employee_model.js";
import LeaveType from "../../model/LeaveType_model.js";

const getDepartments = async () => {
    return await Department.findAll({
        attributes: ['id', 'name'],
    });
};

const getUserIds = async () => {
    const employeeIds = await Employee.findAll({
        attributes: ['employee_id'],
    });
    return employeeIds.map((item) => ({
        employee_id: item.employee_id,
    }));
};

const getLeaveTypes = async () => {
    return await LeaveType.findAll({
        attributes: ['id', 'name'],
    })
};

const getDpmSupervisor = async (id) => {
    let employeeId = await Department.findOne({
        where: { id }
    });
    if (!employeeId) return { name: null };
    employeeId = employeeId.dataValues.supervisor_id;
    return await Employee.findOne({
        where: { employee_id: employeeId },
        attributes: ['name']
    });
};

export default { getDepartments, getUserIds, getLeaveTypes, getDpmSupervisor };

