import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const WorkTypeDetail = sequelize.define('WorkTypeDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    work_type_id: DataTypes.STRING,
    work_type_period_id: DataTypes.INTEGER,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    hours: DataTypes.FLOAT
}, {
    tableName: 'work_type_detail',
    timestamps: false
});

export default WorkTypeDetail;

