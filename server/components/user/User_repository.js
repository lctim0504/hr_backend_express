import Account from "../../model/Account_model.js";
import Employee from "../../model/Employee_model.js";

const getAllUsers = async () => {
    return Employee.findAll();
};

const getUserById = async (employee_id) => {
    return Employee.findByPk(employee_id);
};

const createUser = async (userData) => {
    return Employee.create(userData);
};

const updateUser = async (employee_id, userData) => {
    return Employee.update(userData, { where: { employee_id } });
};

const deleteUser = async (employee_id) => {
    return Employee.destroy({ where: { employee_id } });
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
