import Employee from "../../model/Employee_model.js";

const getAllUsers = async () => {
    return await Employee.findAll();
};

const getUserById = async (employee_id) => {
    return await Employee.findByPk(employee_id);
};

const createUser = async (userData) => {
    return await Employee.create(userData);
};

const updateUser = async (employee_id, userData) => {
    const result = await Employee.update(userData, { where: { employee_id }, returning: true });
    return result[1][0];
};


const deleteUser = async (employee_id) => {
    return await Employee.destroy({ where: { employee_id } });
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
