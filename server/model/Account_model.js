import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Account = sequelize.define('Account', {
  account: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'account',
  timestamps: false
});

export default Account;
