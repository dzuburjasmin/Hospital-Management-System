const {Sequelize} = require("sequelize");
const config = require('../config/config');


const Doctor = config.db.define("Doctor", {
    Id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        field:"id",
        autoIncrement:true
    },
    FirstName: {
        type: Sequelize.STRING,
        required: true,
        field:"first_name"
    },
    LastName: {
        type: Sequelize.STRING,
        required: true,
        field:"last_name"
    },
    Jmbg: {
        type: Sequelize.INTEGER,
        required: false,
        field:"jmbg"
    },
    Speciality: {
        type: Sequelize.STRING,
        required: true,
        field:"speciality"
    },
    Email: {
        type: Sequelize.STRING,
        required: true,
        field:"email"
    },
    Phone: {
        type: Sequelize.STRING,
        required: true,
        field:"phone_number"
    },
    Password: {
        type: Sequelize.TEXT,
        required: true,
        field:"hashed_password"
    },
    Salt:{
        type: Sequelize.TEXT,
        required: true,
        field:"salt",
        allowNull:false
    },
    City:{
        type: Sequelize.STRING,
        required: false,
        field:"city",
        defaultValue:null
    }
},{timestamps:false,tableName:'doctors'});
module.exports = Doctor;
