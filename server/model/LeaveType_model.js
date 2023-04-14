import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const LeaveType = sequelize.define('LeaveType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(50),
    quota: DataTypes.INTEGER,
    remark: DataTypes.TEXT,
    gender: DataTypes.INTEGER,
}, {
    tableName: 'leave_type',
    timestamps: false
});

export default LeaveType;

