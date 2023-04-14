import LeaveRecord from "../../model/LeaveRecord_model.js";
import Employee from "../../model/Employee_model.js";
import Department from "../../model/Department_model.js";
import LeaveType from "../../model/LeaveType_model.js";
import { col, fn } from "sequelize";
import { timeParser } from "../../common/timeParser.js";
import sequelize from "../../Database.js";

const createLeave = async (data) => {
    return LeaveRecord.create(data);
};

const getFilterLeave = async ({ department_id, employee_id, leave_type_id }) => {
    const where = {};

    if (department_id) {
        where['$department_id$'] = department_id;
    }

    if (employee_id) {
        where['$employee_data.employee_id$'] = employee_id;
    }

    if (leave_type_id) {
        where['leave_type_id'] = leave_type_id;
    }

    return LeaveRecord.findAll({
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


const getAllLeaves = async () => {
    const results = await LeaveRecord.findAll();
    const formattedResults = results.map(result => ({
        ...result.dataValues,
        start_time: timeParser(result.start_time),
        end_time: timeParser(result.end_time),
    }));
    return formattedResults;
};



const getLeaveById = async (employee_id) => {
    return LeaveRecord.findAll({ where: { employee_id } });
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


const updateLeave = async (seq, data) => {
    const updateResult = await LeaveRecord.update(data, { where: { seq }, returning: true });
    return updateResult[1][0];
};
const updateBulkLeave = async (seqs, data) => {
    const trade = await sequelize.transaction();
    try {
        await LeaveRecord.update(data, {
            where: {
                seq: seqs
            },
            transaction: trade
        });
        const updatedRecords = await LeaveRecord.findAll({
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
const deleteLeave = async (seq) => {
    return LeaveRecord.destroy({ where: { seq } });
};
const deleteBulkLeave = async (seq) => {
    const trade = await sequelize.transaction();
    try {
        await LeaveRecord.destroy({
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

export default { getAllLeaves, getLeaveById, createLeave, updateLeave, updateBulkLeave, deleteBulkLeave, deleteLeave, getFilterLeave, getSupervisorEmailById };
