import sequelize from "../../Database.js";
import UserModel from "../../model/User_model.js";

const User = UserModel(sequelize);

const createAuth = async (AuthData) => {

};

const checkId = async (employee_id) => {
    return await User.findOne({ where: { employee_id } });
};
const checkPassword = async (employee_id, password) => {
    return await User.findOne({ where: { employee_id, password } });
};

export default { checkId, checkPassword, createAuth };
