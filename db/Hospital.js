const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class Hospital extends Model {}

Hospital.init(
  {
    hname: {
      type: DataTypes.STRING,
    },
    regNo: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.STRING,
    },
    government: {
      type: DataTypes.STRING,
    },
    specialityDep: {
      type: DataTypes.STRING,
    },
    doctorsWorking: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "Hospital",
  }
);

module.exports = Hospital;
