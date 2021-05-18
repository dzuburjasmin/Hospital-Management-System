const {Sequelize} = require("sequelize");
const config = require('../config/config');
const Doctor = require("./doctor");
const Patient = require("./patient");

const Prescription = config.db.define("Prescription",{
    Created:{
        field:"created",
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    Expires:{
        field:"expires",
        allowNull:false,
        type:Sequelize.DATE
    },
    Description:{
        field:"description",
        type:Sequelize.STRING,
        allowNull:false,
    },
    Institution:{
        field:"institution",
        type:Sequelize.STRING,
        allowNull:true,
    },
    PatientId:{
        field:"patient_id",
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:"patients",
            key:"id"
        }
    },
    DoctorId:{
        field:"doctor_id",
        type:Sequelize.INTEGER,
        references:{
            model:"doctors",
            key:"id"
        }
    },
    Status:{
        field:"status",
        type:Sequelize.INTEGER,
        defaultValue:0
    }
},{createdAt:'Created', timestamps:false})

Prescription.belongsTo(Doctor)
Prescription.belongsTo(Patient)

module.exports = Prescription;