import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const OvertimeType = sequelize.define('OvertimeType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: DataTypes.STRING,
}, {
    tableName: 'overtime_type',
    timestamps: false
});

export default OvertimeType;
