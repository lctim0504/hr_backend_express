import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const WorkType = sequelize.define('WorkType', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'work_type',
    timestamps: false
});

export default WorkType;
