import sequelize from "../../Database.js";
import Account from "../../model/Account_model.js";
import Department from "../../model/Department_model.js";
import Employee from "../../model/Employee_model.js";
import WorkType from "../../model/WorkType_model.js";

const getAllAccount = async () => {
    return Account.findAll();
};

const createAuth = async (userData) => {
    return Account.create(userData);
};

const checkId = async (account) => {
    return await Account.findOne({ where: { account } });
};

const checkPassword = async (account, password) => {
    return await Account.findOne({ where: { account, password } });
};

const getUserData = async (employee_id) => {
    const employee = await Employee.findOne({
        where: { employee_id },
        include: [
            {
                model: WorkType,
                as: 'work_type',
                attributes: ['id', 'name']
            },
            {
                model: Department,
                as: 'department',
                attributes: ['id']
            }
        ]
    });
    return employee == null ? null : {
        employee_id: employee.employee_id,
        name: employee.name,
        work_type: employee.work_type.name,
        work_type_id: employee.work_type.id,
        department_id: employee.department.id,
        isAdmin: employee.isAdmin,
        isSupervisor: employee.isSupervisor,
    };
};

const deleteAccount = async (account) => {
    return Account.destroy({ where: { account } });
};

const deleteBulkAccount = async (accounts) => {
    const trade = await sequelize.transaction();
    try {
        await Account.destroy({
            where: {
                account: accounts
            },
            transaction: trade
        });
        await trade.commit();
        // console.log("Delete accounts successfully!");
    } catch (error) {
        await trade.rollback();
        console.error("Delete accounts failed: ", error);
    }
}




export default { checkId, checkPassword, createAuth, getUserData, deleteAccount, getAllAccount, deleteBulkAccount };
