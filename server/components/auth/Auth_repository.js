import Account from "../../model/Account_model.js";
import Employee from "../../model/Employee_model.js";

const createAuth = async (AuthData) => {
    //
};

const checkId = async (account) => {
    return await Account.findOne({ where: { account } });
};
const checkPassword = async (account, password) => {
    return await Account.findOne({ where: { account, password } });
};
const getUserData = async (employee_id) => {
    return await Employee.findOne({ where: { employee_id } });
};

export default { checkId, checkPassword, createAuth, getUserData };
