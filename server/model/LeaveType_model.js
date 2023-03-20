import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const LeaveType = sequelize.define('LeaveType', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'leave_type',
    timestamps: false
});

export default LeaveType;
