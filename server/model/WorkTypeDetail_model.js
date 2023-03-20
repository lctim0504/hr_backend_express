import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const WorkTypeDetail = sequelize.define('WorkTypeDetail', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    work_type_id: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    work_type_period_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    hours: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    tableName: 'work_type_detail',
    timestamps: false
});

export default WorkTypeDetail;
