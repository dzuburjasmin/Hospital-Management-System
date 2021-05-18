const config = require('../config/config');
const Doctor = require("../models/doctor");
const Patient = require("../models/patient")
const bcrypt = require("bcrypt")


const user_register = async (req, res) => {
    try {
        
        let body = req.body;
        console.log(body)
        for (const prop of Object.keys(body)) {
            console.log(prop, body[prop]);
            if ((body[prop] === null || undefined)) {
                console.log("problem with prop:" + prop);
                res.status(400).send("Object is invalid");
                return;
            }
        }

        createNewUser(body)
            .then(result => {
                const [user, create] = result;
                if (create) {
                    res.statusCode = 200;
                    res.json({ message: create });
                }
                else {
                    res.statusCode = 400;
                    res.json({ message: "Either JMBG, phone number or email already exist" });
                }
            }).catch(err => console.log(err))



    }
    catch (error) {
        res.json({ error })
    }
}

const user_login = async (req, res) => {
    try {
        let { Email, Password } = req.body
        let bool = req.body.isDoctor == "true"
        if (bool) {
            Doctor.findAll({ where: { Email } })
                .then((doctor) => {
                    if (doctor.length == 1) {
                       bcrypt.compare(Password, doctor[0].Password,(e,r)=>{
                        if(e)console.log(e);
                        if(r){
                            res.statusCode = 200;
                            res.json({ message: "Successfully logged in", doctor:doctor[0]}) 
                        }
                        else{
                            res.statusCode = 400;
                            res.json({ message: "Incorrect password" })
                        }
                    })
                    } else {
                        res.json({ message: "Incorrect email" })
                        req.statusCode = 404;
                    }
                }).catch(error => console.log(error))
        } else {
            Patient.findAll({ where: { Email } })
                .then((patient) => {
                    if (patient.length == 1) {
                        bcrypt.compare(Password, patient[0].Password,(e,r)=>{
                            if(e)console.log(e);
                            if(r){
                                res.statusCode = 200;
                                res.json({ message: "Successfully logged in", patient:patient[0] }) 
                            }
                            else{
                                res.statusCode = 400;
                                res.json({ message: "Credentials incorrect" })
                            }
                        })
                    }
                    else {
                        res.json({ message: "Incorrect credentials" })
                    }
                }).catch(error => console.log(error))

        }
    }
    catch (error) {
        res.json({ error })
    }
}

const user_display_all = (req, res) => {
    try {
        Doctor.findAll().then(doctors => { res.send(doctors); console.log(doctors) }).catch(err => console.log(err))
    }
    catch (error) {
        res.json(error)
    }
}

const user_update_profile = (req, res) =>{
    let { FirstName, LastName, Jmbg, Speciality, Email, Phone, Password, City } = body
    if(req.body.isDoctor){
          Doctor.update({FirstName, LastName, Jmbg, Speciality, Email, Phone, City},{where:{Email}})
    }
    else{
        Patient.update({FirstName, LastName, Jmbg, Speciality, Email, Phone, City},{where:{Email}})
    }        
    
}

const user_update_password = (req, res) => {
    if(req.body.isDoctor){
        Doctor.findOne({where:{Email}}).then(doc => {
            bcrypt.compare(doc.Password, oldPassword,(e,r)=>{
                if(e) console.log(e);
                if(r){
                    Doctor.update({Password:newPassword},{where:{Email:doc.Email}})
                    res.statusCode = 200;
                    res.json("password updated")
                }else{
                    res.statusCode = 400;
                    res.json("incorrect old password")
                }
            })
        })
    }
}
//------------------------------------


var createNewUser = async (body) => {
    let { FirstName, LastName, Jmbg, Speciality, Email, Phone, Password, City } = body
    let salt = await bcrypt.genSalt();
    Password = await bcrypt.hash(Password, salt)
    Salt = salt
    let bool = body.isDoctor == "true"

    if (bool) {
        return Doctor.findOrCreate({
            where: { [config.op.or]: [{ Jmbg }, { Email }, { Phone }] }, defaults: {
                FirstName,
                LastName,
                Jmbg,
                Speciality,
                Email,
                Phone,
                Password,
                Salt,
                City
            }
        })
    }
    else {
        return Patient.findOrCreate({
            where: { [config.op.or]: [{ Jmbg }, { Email }, { Phone }] }, defaults: {
                FirstName,
                LastName,
                Jmbg,
                Email,
                Phone,
                Password,
                Salt,
                City
            }
        })
    }
}


//<>
// exports of controllers function
//</>

module.exports = {
    user_register,
    user_login,
    user_display_all,
    user_update_profile,
    user_update_password
}