const express = require("express");
const router = express.Router();
const db = require("../config/config")
const Doctor = require("../models/doctor")



router.get('/', (req, res) => {
    Doctor.findAll().then(doctors => { res.send(doctors); console.log(doctors) }).catch(err => console.log(err))
}
);


// </>


module.exports = router