const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescriptionController");

router.get("/", prescriptionController.prescriptions_get_all)
router.get("/doctors/:DoctorId",prescriptionController.prescription_get_by_doctor)
router.get("/patients/:PatientId",prescriptionController.prescription_get_by_patient)
router.post("/doctors/:DoctorId/approve/:Id", prescriptionController.prescription_approve)
router.post("/", prescriptionController.prescription_insert_new)

module.exports = router;