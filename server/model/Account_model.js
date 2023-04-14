import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Account = sequelize.define('Account', {
  account: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: DataTypes.STRING,
}, {
  tableName: 'account',
  timestamps: false
});

export default Account;
