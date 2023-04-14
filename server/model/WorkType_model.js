import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const WorkType = sequelize.define('WorkType', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
}, {
    tableName: 'work_type',
    timestamps: false
});

export default WorkType;
