import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const LeaveQuota = sequelize.define('leave_quota', {
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  on_board_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  '9': {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  '8': {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  '6': {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  '17': {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  '7': {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  remark: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'leave_quota',
  timestamps: false,
});

export default LeaveQuota;
