import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const OvertimeRecord = sequelize.define('overtime_records', {
  seq: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  employee_id: DataTypes.STRING(20),
  overtime_type_id: DataTypes.INTEGER,
  year: DataTypes.INTEGER,
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
  hours: DataTypes.FLOAT,
  permit_id: DataTypes.STRING(20),
  hr_permit: DataTypes.BOOLEAN,
  permit_time: DataTypes.DATE,
  sv_permit: DataTypes.BOOLEAN,
  reason: DataTypes.TEXT,
  last_update_time: DataTypes.DATE,
  act_start_time: DataTypes.DATE,
  act_end_time: DataTypes.DATE,
}, {
  tableName: 'overtime_records',
  timestamps: false
});

export default OvertimeRecord;
