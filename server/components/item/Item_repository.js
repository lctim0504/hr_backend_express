import Department from "../../model/Department_model.js";
import Employee from "../../model/Employee_model.js";

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

export default { getDepartments, getUserIds };

