import Account from "../../model/Account_model.js";

const getAllUsers = async () => {
    return Account.findAll();
};

const getUserById = async (account) => {
    return Account.findByPk(account);
};

const createUser = async (userData) => {
    return Account.create(userData);
};

const updateUser = async (account, userData) => {
    return Account.update(userData, { where: { account } });
};

const deleteUser = async (account) => {
    return Account.destroy({ where: { account } });
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
