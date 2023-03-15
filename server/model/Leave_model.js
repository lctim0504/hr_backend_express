import { DataTypes } from "sequelize";
import sequelize from "../Database.js";
import Employee from "./Employee_model.js";

const Leave = sequelize.define('Leave', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  leave_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: true
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
    allowNull: true
  },
  substitute: {
    type: DataTypes.STRING,
    allowNull: true
  },
  permit: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
}, {
  dialectOptions: {
    collate: 'Chinese_Taiwan_Stroke_CI_AS'
  },
  tableName: 'leave_data1',
  timestamps: false
});

Leave.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

export default Leave;
