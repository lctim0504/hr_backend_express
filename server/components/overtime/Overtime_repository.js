import OvertimeRecord from "../../model/OvertimeRecord_model.js";
import Employee from "../../model/Employee_model.js";
import Department from "../../model/Department_model.js";
import OvertimeType from "../../model/OvertimeType_model.js";
import { col, fn } from "sequelize";
import { timeParser } from "../../common/timeParser.js";
import sequelize from "../../Database.js";

const createOvertime = async (data) => {
    return OvertimeRecord.create(data);
};

const getFilterOvertime = async ({ department_id, employee_id, overtime_type_id }) => {
    const where = {};

    if (department_id) {
        where['$department_id$'] = department_id;
    }

    if (employee_id) {
        where['$employee_data.employee_id$'] = employee_id;
    }

    if (overtime_type_id) {
        where['overtime_type_id'] = overtime_type_id;
    }

    return OvertimeRecord.findAll({
        where,
        include: [
            {
                model: Employee,
                as: 'employee_data',
                attributes: ['name', 'department_id'],
            },
        ],
    });
};

const getAllOvertimes = async () => {
    const results = await OvertimeRecord.findAll();
    const formattedResults = results.map(result => ({
        ...result.dataValues,
        start_time: timeParser(result.start_time),
        end_time: timeParser(result.end_time),
    }));
    return formattedResults;
};

const getOvertimeById = async (employee_id) => {
    return OvertimeRecord.findAll({ where: { employee_id } });
};

const getSupervisorEmailById = async (employee_id) => {
    const supervisor_id = await Employee.findOne({
        where: { employee_id },
        include: {
            model: Department,
            as: 'department',
            attributes: ['supervisor_id'],
        },
    }).then((employee) => employee.department.supervisor_id);

    const supervisor_email = await Employee.findOne({
        where: { employee_id: supervisor_id },
        attributes: ['email'],
    }).then((employee) => employee.email);

    return supervisor_email;
};

const updateOvertime = async (seq, data) => {
    const updateResult = await OvertimeRecord.update(data, { where: { seq }, returning: true });
    return updateResult[1][0];
};
const updateBulkOvertime = async (seqs, data) => {
    const trade = await sequelize.transaction();
    try {
        await OvertimeRecord.update(data, {
            where: {
                seq: seqs
            },
            transaction: trade
        });
        const updatedRecords = await OvertimeRecord.findAll({
            where: {
                seq: seqs
            },
            transaction: trade
        });
        await trade.commit();
        console.log("Update records successfully!");
        return updatedRecords;
    } catch (error) {
        await trade.rollback();
        console.error("Update records failed: ", error);
    }
};
const deleteBulkOvertime = async (seq) => {
    const trade = await sequelize.transaction();
    try {
        await OvertimeRecord.destroy({
            where: { seq },
            transaction: trade
        });
        await trade.commit();
        console.log("delete records successfully!");
    } catch (error) {
        await trade.rollback();
        console.error("delete records failed: ", error);
    }
};

const deleteOvertime = async (seq) => {
    return OvertimeRecord.destroy({ where: { seq } });
};

export default { getAllOvertimes, getOvertimeById, deleteBulkOvertime, createOvertime, updateOvertime, updateBulkOvertime, deleteOvertime, getFilterOvertime, getSupervisorEmailById };
