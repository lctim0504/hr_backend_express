import Employee from "../../model/Employee_model.js";
import Department from "../../model/Department_model.js";
import LeaveQuota from "../../model/LeaveQuota_model.js";
import LeaveType from "../../model/LeaveType_model.js";
import LeaveRecord from "../../model/LeaveRecord_model.js";
import { Op } from "sequelize";
import sequelize from "../../Database.js";

const createQuota = async (data) => {
    console.log(data);
    return LeaveQuota.create(data);
};
const getLeaveQuota = async () => {
    return LeaveType.findAll({
        attributes: ['id', 'quota', 'gender']
    });
};

const getIdLeaveQuota = async (employee_id) => {
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

const getFilterQuota = async ({ department_id, employee_id, quota_type_id }) => {
    //     const where = {};

    //     if (department_id) {
    //         where['$department_id$'] = department_id;
    //     }

    //     if (employee_id) {
    //         where['$employee_data.employee_id$'] = employee_id;
    //     }

    //     if (quota_type_id) {
    //         where['quota_type_id'] = quota_type_id;
    //     }

    //     return QuotaRecord.findAll({
    //         where,
    //         include: [
    //             {
    //                 model: Employee,
    //                 as: 'employee_data',
    //                 attributes: ['name', 'department_id'],
    //             },
    //         ],
    //     });
};


const getAllQuotas = async () => {
    //     return QuotaRecord.findAll();
};

const getQuotaById = async (employee_id) => {
    //     return QuotaRecord.findAll({ where: { employee_id } });
};
const getSupervisorEmailById = async (employee_id) => {
    //     const supervisor_id = await Employee.findOne({
    //         where: { employee_id },
    //         include: {
    //             model: Department,
    //             as: 'department',
    //             attributes: ['supervisor_id'],
    //         },
    //     }).then((employee) => employee.department.supervisor_id);

    //     const supervisor_email = await Employee.findOne({
    //         where: { employee_id: supervisor_id },
    //         attributes: ['email'],
    //     }).then((employee) => employee.email);

    //     return supervisor_email;
};


const updateQuota = async (seq, data) => {
    //     const updateResult = await QuotaRecord.update(data, { where: { seq }, returning: true });
    //     return updateResult[1][0];
};

const deleteQuota = async (seq) => {
    //     return QuotaRecord.destroy({ where: { seq } });
};

export default { getIdLeaveQuota, getLeaveUsed, getLeaveQuota, getAllQuotas, getQuotaById, createQuota, updateQuota, deleteQuota, getFilterQuota, getSupervisorEmailById };
