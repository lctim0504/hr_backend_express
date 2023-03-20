import { DataTypes } from "sequelize";
import sequelize from "../Database.js";
import Employee from "./Employee_.js";

const OvertimeRecord = sequelize.define('OvertimeRecord', {
  seq: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  leave_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
  },
  sub_name: {
    type: DataTypes.STRING,
  },
  permit: {
    type: DataTypes.BOOLEAN,
  },
  permit_time: {
    type: DataTypes.DATE,
  },
  create_time: {
    type: DataTypes.DATE,
  },
}, {
  dialectOptions: {
    collate: 'Chinese_Taiwan_Stroke_CI_AS'
  },
  tableName: 'overtime_records',
  timestamps: false
});

export default OvertimeRecord;
