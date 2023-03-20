import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Employee = sequelize.define('Employee', {
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  department_id: DataTypes.STRING,

}, {
  tableName: 'employee',
  timestamps: false
});
export default Employee;

