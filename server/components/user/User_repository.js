import { Op } from "sequelize";
import Employee from "../../model/Employee_model.js";
import LeaveQuota from "../../model/LeaveQuota_model.js";
import LeaveRecord from "../../model/LeaveRecord_model.js";
import sequelize from "../../Database.js";

const getLeavequota = async (employee_id) => {
    return await LeaveQuota.findByPk(employee_id);
};
const getLeaveUsed = async (employee_id, date1, date2) => {
    try {
        const result = await LeaveRecord.findAll({
            where: {
                employee_id,
                start_time: {
                    [Op.between]: [date1, date2],
                },
            },
            attributes: [
                'leave_type_id',
                [sequelize.fn('SUM', sequelize.col('hours')), 'total_hours'],
            ],
            group: ['leave_type_id'],
            raw: true, // 取得單純的 JSON 物件
        });
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
};


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

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, getLeavequota, getLeaveUsed };
