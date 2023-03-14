import sequelize from "../../Database.js";
import UserModel from "../../model/User_model.js";

const User = UserModel(sequelize);

const getAllUsers = async () => {
    return User.findAll();
};

const getUserById = async (id) => {
    // return User.findOne({ where: { id } })
    return User.findByPk(id);
};

const createUser = async (userData) => {
    return User.create(userData);
};

const updateUser = async (id, userData) => {
    return User.update(userData, { where: { employee_id: id } });
};

const deleteUser = async (id) => {
    return User.destroy({ where: { employee_id: id } });
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
