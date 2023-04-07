import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Leave = sequelize.define('Leave', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  leave_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  remaining_hours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  total_hours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  leave_start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  leave_end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  last_update_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  create_time: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'leave',
  timestamps: false
});

export default Leave;
