import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
  const User = sequelize.define('User', {

    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user1',
    timestamps: false
  });

  return User;
};

export default UserModel;
