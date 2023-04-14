import { DataTypes } from "sequelize";
import sequelize from "../Database.js";
import Employee from "./Employee_model.js";

const LeaveRecord = sequelize.define('LeaveRecord', {
  seq: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: DataTypes.STRING,
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
  hours: DataTypes.FLOAT,
  leave_type_id: DataTypes.INTEGER,
  reason: DataTypes.TEXT,
  sub_name: DataTypes.STRING,
  hr_permit: DataTypes.BOOLEAN,
  sv_permit: DataTypes.BOOLEAN,
  permit_time: DataTypes.DATE,
  create_time: DataTypes.DATE,
}, {
  dialectOptions: {
    collate: 'Chinese_Taiwan_Stroke_CI_AS',
  },
  tableName: 'leave_records',
  timestamps: false
});

LeaveRecord.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee_data' });

export default LeaveRecord;
