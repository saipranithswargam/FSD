const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Patient extends Model{}

Patient.init({
    name :{
        type: DataTypes.STRING
    }, 
    email: {
        type: DataTypes.STRING
    }, 
    mobileNum: {
        type: DataTypes.STRING
    }, 
    emergencyContact: {
        type: DataTypes.STRING
    }, 
    height: {
        type: DataTypes.STRING
    }, 
    weight: {
        type: DataTypes.STRING
    }, 
    bloodGroup: {
        type: DataTypes.STRING
    }, 
    city: {
        type: DataTypes.STRING
    }, 
    state: {
        type: DataTypes.STRING
    }, 
    pincode: {
        type: DataTypes.STRING
    }, 
    age: {
        type: DataTypes.STRING
    }, 
    medicalInsuranceNo: {
        type: DataTypes.STRING
    }, 
    gender: {
        type: DataTypes.STRING
    }, 
    married: {
        type: DataTypes.STRING
    }, 
    allergies: {
        type: DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
},
{
    sequelize,
    modelName: 'patient'
});

module.exports = Patient;