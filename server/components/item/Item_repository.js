import Department from "../../model/Department_model.js";
import Employee from "../../model/Employee_model.js";
import LeaveType from "../../model/LeaveType_model.js";

const getDepartments = async () => {
    const departments = await Department.findAll({
        attributes: ['department_id', 'name'],
    });
    return departments.map((item) => ({
        department_id: item.department_id,
        name: item.name,
    }));
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
    const result = await LeaveType.findAll({
        attributes: ['name'],
    });
    return result.map((item) => ({
        leave_type: item.name,
    }));
};

const getDpmSupervisor = async (dpm) => {
    let employeeId = await Department.findOne({
        where: { department_id: dpm }
    });
    if (!employeeId) return { name: null };
    employeeId = employeeId.dataValues.supervisor_id;
    return await Employee.findOne({
        where: { employee_id: employeeId },
        attributes: ['name']
    });
};

export default { getDepartments, getUserIds, getLeaveTypes, getDpmSupervisor };

