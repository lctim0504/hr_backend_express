import sequelize from "../../Database.js";
import config from "../../Database2.js";
import LeaveModel from "./Leave_model.js";
import sql from "mssql"

const Leave = LeaveModel(sequelize);

const getAllLeaves = async () => {
    return Leave.findAll();
};

const getLeaveById = async (id) => {
    return Leave.findAll({ where: { employee_id: id } });
};

const pool = new sql.ConnectionPool(config);
await pool.connect();

const createLeave = async (LeaveData) => {
    const sql = `INSERT INTO leave_data1(
            Employee_Id, Work_date, Start_time, End_time, Hours, Leave_type_Id) 
            VALUES (@EmployeeId, @WorkDate, @StartTime, @EndTime, @Hours, @LeaveTypeId)`;

    const values = {
        EmployeeId: LeaveData.Employee_Id,
        WorkDate: LeaveData.Work_date,
        StartTime: LeaveData.Start_time,
        EndTime: LeaveData.End_time,
        Hours: LeaveData.Hours,
        LeaveTypeId: LeaveData.Leave_type_Id
    };

    const result = await pool.request()
        .input('EmployeeId', sql.NVarChar, values.EmployeeId)
        .input('WorkDate', sql.Date, values.WorkDate)
        .input('StartTime', sql.NVarChar, values.StartTime)
        .input('EndTime', sql.NVarChar, values.EndTime)
        .input('Hours', sql.Int, values.Hours)
        .input('LeaveTypeId', sql.Int, values.LeaveTypeId)
        .query(sql);

    return result.recordset[0];
};

const updateLeave = async (id, LeaveData) => {
    return Leave.update(LeaveData, { where: { employee_id: id } });
};

const deleteLeave = async (id) => {
    return Leave.destroy({ where: { id } });
};

export default { getAllLeaves, getLeaveById, createLeave, updateLeave, deleteLeave };
