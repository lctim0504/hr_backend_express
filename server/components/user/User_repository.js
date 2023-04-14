import { Op } from "sequelize";
import Employee from "../../model/Employee_model.js";
import LeaveQuota from "../../model/LeaveQuota_model.js";
import LeaveRecord from "../../model/LeaveRecord_model.js";
import sequelize from "../../Database.js";

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

const deleteBulkUser = async (ids) => {
    const trade = await sequelize.transaction();
    try {
        await Employee.destroy({
            where: {
                employee_id: ids
            },
            transaction: trade
        });
        await trade.commit();
        // console.log("Delete accounts successfully!");
    } catch (error) {
        await trade.rollback();
        console.error("Delete users failed: ", error);
    }
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, deleteBulkUser };
