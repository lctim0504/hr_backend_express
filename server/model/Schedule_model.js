import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const scheduleModel = sequelize.define('schedule1', {
    seq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    '1': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '2': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '3': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '4': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '5': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '6': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '7': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '8': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '9': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '10': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '11': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '12': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '13': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '14': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '15': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '16': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '17': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '18': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '19': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '20': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '21': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '22': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '23': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '24': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '25': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '26': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '27': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '28': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '29': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '30': {
        type: DataTypes.STRING,
        allowNull: false,
    },
    '31': {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'schedule1',
    timestamps: false
});

export default scheduleModel;

