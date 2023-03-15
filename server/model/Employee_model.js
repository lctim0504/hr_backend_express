import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'employee',
  timestamps: false
});
export default Employee;

