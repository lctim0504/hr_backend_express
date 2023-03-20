import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const OvertimeType = sequelize.define('OvertimeType', {
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
    tableName: 'overtime_type',
    timestamps: false
});

export default OvertimeType;
