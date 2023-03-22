import { DataTypes } from "sequelize";
import sequelize from "../Database.js";
import WorkType from "./WorkType_model.js";

const Employee = sequelize.define('Employee', {
  employee_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  department_id: DataTypes.STRING,
  work_type_id: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN,
}, {
  tableName: 'employee',
  timestamps: false
});

Employee.belongsTo(WorkType, { foreignKey: 'work_type_id', as: 'work_type' });


export default Employee;

