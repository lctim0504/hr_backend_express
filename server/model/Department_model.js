import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Department = sequelize.define('Department', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    parent_id: DataTypes.STRING,
    supervisor_id: DataTypes.STRING,
}, {
    tableName: 'department',
    timestamps: false
});

export default Department;


