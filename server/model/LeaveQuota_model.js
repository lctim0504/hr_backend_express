import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const LeaveQuota = sequelize.define('leave_quota', {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  on_board_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  '2': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '3': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '4': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '5': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '6': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '7': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '8': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '9': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '14': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '15': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '16': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '17': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '21': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '22': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '23': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  '24': {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  remark: {
    type: DataTypes.TEXT,
    allowNull: true
  }}
  ,{
  tableName: 'leave_quota',
  timestamps: false,
});

export default LeaveQuota;
