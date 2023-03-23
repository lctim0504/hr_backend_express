import Account from "../../model/Account_model.js";
import Department from "../../model/Department_model.js";
import Employee from "../../model/Employee_model.js";
import WorkType from "../../model/WorkType_model.js";

const createAuth = async (userData) => {
    return Account.create(userData);
};

const checkId = async (account) => {
    return await Account.findOne({ where: { account } });
};
const checkPassword = async (account, password) => {
    5
    return await Account.findOne({ where: { account, password } });
};
const getUserData = async (employee_id) => {
    const employee = await Employee.findOne({
        where: { employee_id },
        include: [
            {
                model: WorkType,
                as: 'work_type',
                attributes: ['name']
            },
            {
                model: Department,
                as: 'department',
                attributes: ['name']
            }
        ]
    });
    return {
        employee_id: employee.employee_id,
        name: employee.name,
        work_type: employee.work_type.name,
        department: employee.department.name,
    };
};

export default { checkId, checkPassword, createAuth, getUserData };
