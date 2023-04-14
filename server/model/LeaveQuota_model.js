import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Leave = sequelize.define('Leave', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  employee_id: DataTypes.STRING,
  year: DataTypes.INTEGER,
  leave_type_id: DataTypes.INTEGER,
  remaining_hours: DataTypes.FLOAT,
  total_hours: DataTypes.FLOAT,
  leave_start_date: DataTypes.DATEONLY,
  leave_end_date: DataTypes.DATEONLY,
  last_update_time: DataTypes.DATE,
  create_time: DataTypes.DATE
}, {
  tableName: 'leave',
  timestamps: false
});

export default Leave;
