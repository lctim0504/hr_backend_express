import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Department = sequelize.define('Department', {
    department_id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    parent_id: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    supervisor_id: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'department',
    timestamps: false
});

export default Department;

