import Department from "../../model/Department_model.js";
import Employee from "../../model/Employee_model.js";
import LeaveType from "../../model/LeaveType_model.js";
import OvertimeType from "../../model/OvertimeType_model.js";
import WorkTypeDetail from "../../model/WorkTypeDetail_model.js";

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

const getOvertimeTypes = async () => {
    return await OvertimeType.findAll({
        attributes: ['id', 'name'],
    })
};


const getLeaveTypeDetail = async (work_type_id) => {
    return await WorkTypeDetail.findAll({
        where: { work_type_id, work_type_period_id: 1 },
        attributes: ['start_time', 'end_time', 'hours'],
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

const updateDpmSupervisor = async (id, supervisor_id) => {
    const [count, [updatedDepartment]] = await Department.update({ supervisor_id }, {
        where: { id },
        returning: true,
    });
    return updatedDepartment;
};



export default { getOvertimeTypes, updateDpmSupervisor, getLeaveTypeDetail, getDepartments, getUserIds, getLeaveTypes, getDpmSupervisor };

