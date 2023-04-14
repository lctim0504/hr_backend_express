import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Schedule = sequelize.define('Schedule', {
    seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: DataTypes.STRING,
    year: DataTypes.STRING,
    month: DataTypes.STRING,
    '1': DataTypes.STRING,
    '2': DataTypes.STRING,
    '3': DataTypes.STRING,
    '4': DataTypes.STRING,
    '5': DataTypes.STRING,
    '6': DataTypes.STRING,
    '7': DataTypes.STRING,
    '8': DataTypes.STRING,
    '9': DataTypes.STRING,
    '10': DataTypes.STRING,
    '11': DataTypes.STRING,
    '12': DataTypes.STRING,
    '13': DataTypes.STRING,
    '14': DataTypes.STRING,
    '15': DataTypes.STRING,
    '16': DataTypes.STRING,
    '17': DataTypes.STRING,
    '18': DataTypes.STRING,
    '19': DataTypes.STRING,
    '20': DataTypes.STRING,
    '21': DataTypes.STRING,
    '22': DataTypes.STRING,
    '23': DataTypes.STRING,
    '24': DataTypes.STRING,
    '25': DataTypes.STRING,
    '26': DataTypes.STRING,
    '27': DataTypes.STRING,
    '28': DataTypes.STRING,
    '29': DataTypes.STRING,
    '30': DataTypes.STRING,
    '31': DataTypes.STRING,
}, {
    tableName: 'schedule',
    timestamps: false
});

export default Schedule;


