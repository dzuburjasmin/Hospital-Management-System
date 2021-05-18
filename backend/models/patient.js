const {Sequelize} = require("sequelize");
const config = require('../config/config');

const Patient = config.db.define("Patient",{
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
        defaultValue:"none"
    }
},{timestamps:false,tableName:'patients'});

module.exports = Patient;  
