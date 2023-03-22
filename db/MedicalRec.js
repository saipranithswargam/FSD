const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class MedicalRec extends Model{}

MedicalRec.init({
    height :{
        type: DataTypes.STRING
    }, 
    weight: {
        type: DataTypes.STRING
    }, 
    temperature: {
        type: DataTypes.STRING
    }, 
    oxygen: {
        type: DataTypes.STRING
    }, 
    bloodPressure: {
        type: DataTypes.STRING
    }, 
    medicines: {
        type: DataTypes.STRING
    }, 
    tests: {
        type: DataTypes.STRING
    }, 
    surgeryRequired: {
        type: DataTypes.STRING
    }, 
    note: {
        type: DataTypes.STRING
    }, 
},
{
    sequelize,
    modelName: 'medicalRecord'
});

module.exports = MedicalRec;