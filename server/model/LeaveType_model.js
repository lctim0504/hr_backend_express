import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const LeaveType = sequelize.define('LeaveType', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remark: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
}, {
    tableName: 'leave_type',
    timestamps: false
});

export default LeaveType;
