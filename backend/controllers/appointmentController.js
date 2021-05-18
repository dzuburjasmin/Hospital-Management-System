const config = require('../config/config');
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Appointment = require("../models/appointment");

appointment_get_all = (req, res)=>{
    Appointment.findAll({include:[Doctor,Patient]}).then(prescriptions=> res.send(prescriptions))

}

apponitment_get_by_doctor = (req, res) =>{
    Appointment.findAll({include:[Doctor, Patient], where:{DoctorId:req.params.DoctorId}})
    .then(x => res.send(x))
}

apponitment_get_by_patient = (req, res) =>{
    Appointment.findAll({include:[Doctor, Patient], where:{PatientId:req.params.PatientId}})
    .then(x => res.send(x))
}

appointment_insert_new = (req, res) => {
    var {Created, Expires, Description, Institution, PatientId, DoctorId, Status} = req.body
    Appointment.create({Created, Expires, Description, Institution, PatientId, DoctorId, Status})
    .then(x=> res.send(x));
}

appointment_approve = (req, res) => {
    Appointment.update({Status:1},{where:{[config.op.and]:[{DoctorId:req.params.DoctorId},{id:req.params.Id}]}})
    .then(x=> res.send(x))
}




module.exports ={
    appointment_get_all,
    appointment_insert_new,
    apponitment_get_by_doctor,
    apponitment_get_by_patient,
    appointment_approve
}