import Schedule from "../../model/Schedule_model.js";
import Employee from "../../model/Employee_model.js";

const createSchedule = async (ScheduleData) => {
    return Schedule.create(ScheduleData);
};

const getDpmSchedule = async (dpm) => {
    return Schedule.findAll({
        where: { department_id: dpm },
        include: [
            {
                model: Employee,
                as: 'employee',
                attributes: ['name'] // 只查询employee的name字段
            }
        ]
    });
};

const getAllSchedules = async () => {
    return Schedule.findAll();
};

const getScheduleById = async (id) => {
    return Schedule.findAll({ where: { employee_id: id } });
};

const updateSchedule = async (id, ScheduleData) => {
    return Schedule.update(ScheduleData, { where: { id } });
};

const deleteSchedule = async (month) => {
    return Schedule.destroy({ where: { month } });
};

export default { getAllSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule, getDpmSchedule };
