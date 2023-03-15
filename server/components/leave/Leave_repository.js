import config from "../../Database2.js";
import sql from "mssql"
import Leave from "../../model/Leave_model.js";
import Employee from "../../model/Employee_model.js";

const pool = new sql.ConnectionPool(config);

const createLeave = async (LeaveData) => {
    const sqlQuery = `INSERT INTO dbo.leave_data1
            (Employee_Id, leave_date, Start_time, End_time, Hours, Leave_type_Id) 
            VALUES (@EmployeeId, @LeaveDate, @StartTime, @EndTime, @Hours, @LeaveTypeId)`;
    const values = {
        EmployeeId: LeaveData.Employee_Id,
        LeaveDate: LeaveData.leave_date,
        StartTime: LeaveData.Start_time,
        EndTime: LeaveData.End_time,
        Hours: LeaveData.Hours,
        LeaveTypeId: LeaveData.Leave_type_Id
    };
    await pool.connect()
    const result = await pool.request()
        .input('EmployeeId', sql.NVarChar, values.EmployeeId)
        .input('LeaveDate', sql.Date, values.LeaveDate)
        .input('StartTime', sql.DateTime, values.StartTime)
        .input('EndTime', sql.DateTime, values.EndTime)
        .input('Hours', sql.Float, values.Hours)
        .input('LeaveTypeId', sql.Int, values.LeaveTypeId)
        .query(sqlQuery);
    return result.rowsAffected > 0;
};

const getDpmLeave = async (dpm) => {
    return Leave.findAll({
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

export default { getAllLeaves, getLeaveById, createLeave, updateLeave, deleteLeave, getDpmLeave };
