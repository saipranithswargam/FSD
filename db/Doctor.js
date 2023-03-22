const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");
class Doctor extends Model {}

Doctor.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    mobileNum: {
      type: DataTypes.STRING,
    },
    liscenceNo: {
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
    age: {
      type: DataTypes.STRING,
    },
    experience: {
      type: DataTypes.STRING,
    },
    availability: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    treatment: {
      type: DataTypes.STRING,
    },
    Speciality: {
      type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    regNo:{
      type:DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "doctor",
  }
);

module.exports = Doctor;

