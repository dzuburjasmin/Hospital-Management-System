const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/", appointmentController.appointment_get_all)
router.get("/doctors/:DoctorId",appointmentController.apponitment_get_by_doctor)
router.get("/patients/:PatientId",appointmentController.apponitment_get_by_patient)
router.post("/", appointmentController.appointment_insert_new)
router.post("/doctors/:DoctorId/approve/:Id", appointmentController.appointment_approve)

module.exports = router;