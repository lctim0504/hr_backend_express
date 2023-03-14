import sequelize from "../../Database.js";
import config from "../../Database2.js";
import sql from "mssql"
import LeaveModel from "../../model/Leave_model.js";

const pool = new sql.ConnectionPool(config);

const createLeave = async (LeaveData) => {
    const sqlQuery = `INSERT INTO dbo.leave_data1
            (Employee_Id, Work_date, Start_time, End_time, Hours, Leave_type_Id) 
            VALUES (@EmployeeId, @WorkDate, @StartTime, @EndTime, @Hours, @LeaveTypeId)`;
    const values = {
        EmployeeId: LeaveData.Employee_Id,
        WorkDate: LeaveData.Work_date,
        StartTime: LeaveData.Start_time,
        EndTime: LeaveData.End_time,
        Hours: LeaveData.Hours,
        LeaveTypeId: LeaveData.Leave_type_Id
    };
    await pool.connect()
    const result = await pool.request()
        .input('EmployeeId', sql.NVarChar, values.EmployeeId)
        .input('WorkDate', sql.Date, values.WorkDate)
        .input('StartTime', sql.DateTime, values.StartTime)
        .input('EndTime', sql.DateTime, values.EndTime)
        .input('Hours', sql.Float, values.Hours)
        .input('LeaveTypeId', sql.Int, values.LeaveTypeId)
        .query(sqlQuery);
    return result.rowsAffected > 0;
};

const Leave = LeaveModel(sequelize);

const getAllLeaves = async () => {
    return Leave.findAll();
};

const getLeaveById = async (id) => {
    return Leave.findAll({ where: { employee_id: id } });
};

const updateLeave = async (id, LeaveData) => {
    return Leave.update(LeaveData, { where: { employee_id: id } });
};

const deleteLeave = async (id) => {
    return Leave.destroy({ where: { id } });
};

export default { getAllLeaves, getLeaveById, createLeave, updateLeave, deleteLeave };
