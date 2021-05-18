const config = require('../config/config');
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Prescription = require("../models/prescription");

prescriptions_get_all = (req, res)=>{
    Prescription.findAll({include:[Doctor,Patient]}).then(prescriptions=> res.send(prescriptions)).then(x=>res.send(x))
}

prescription_get_by_doctor = (req, res) =>{
    console.log(req.params.DoctorId);
    Prescription.findAll({include:[Doctor, Patient], where:{DoctorId:req.params.DoctorId}})
    .then(x => res.send(x))
}

prescription_get_by_patient = (req, res) =>{
    Prescription.findAll({include:[Doctor, Patient], where:{PatientId:req.params.PatientId}})
    .then(x => res.send(x))
}

prescription_insert_new = (req, res) => {
    var {Created, Expires, Description, Institution, PatientId, DoctorId, Status} = req.body
    Prescription.create({Created, Expires, Description, Institution, PatientId, DoctorId, Status})
    .then(x=> res.send(x));
}

prescription_approve = (req, res) => {
    Prescription.update({Status:1},{where:{[config.op.and]:[{DoctorId:req.params.DoctorId},{id:req.params.Id}]}})
    .then(x=> res.send(x))
}



module.exports ={
    prescriptions_get_all,
    prescription_insert_new,
    prescription_get_by_doctor,
    prescription_get_by_patient,
    prescription_approve
}