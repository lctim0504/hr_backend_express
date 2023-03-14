import moment from "moment";
import { DataTypes } from "sequelize";

const LeaveModel = (sequelize) => {
  const Leave = sequelize.define('LeaveModel', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Employee_Id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Work_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    End_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Hours: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Leave_type_Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Form_Id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'leave_data1',
    timestamps: false
  });

  return Leave;
};

export default LeaveModel;
