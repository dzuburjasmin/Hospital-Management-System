function showPatient() {
    document.getElementById("patientRegistration").style.visibility = "visible";
}
function showDoctor() {
    document.getElementById("doctorRegistration").style.visibility = "visible";
}


function showRequestForm() {
    document.getElementById("requestNewFormCont").style.visibility = "visible";
}

function writePrescriptions(data) {
    var prescriptionList = document.getElementById("prescriptionsListScroll");

    for (var i = 0; i < data.length; i++) {
        var prescription = '<div class="appointment">' +
            '<span id="lijeviSpan">ID <p class="appId">' + data[i].id + '</p></span>' +
            '<span>Status <p class="appStatus">' + data[i].status + '</p></span>' +
            '<span>Date Requested<p class="appRequested">' + data[i].created + '</p></span>' +
            '<span>Date Issued<p class="appIssued">' + data[i].expires + '</p></span>' +
            '<span>Name<p class="appDetails">' + data[i].description + '</p></span>' +
            ' </div>';
        prescriptionList.innerHTML += prescription;
    }
}
function createdate(date) {
    var date = new Date(date)
    var day = date.getDate()
    var month = date.getMonth()+1
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function writeAppointments(data) {
    var appointmentList = document.getElementById("appointmentsListScroll");
    console.log(data);
    for (var i = 0; i < data.length; i++) {

        var appointment = '<div class="appointment">' +
            '<span id="lijeviSpan">ID <p class="appId">' + data[i].id + '</p></span>' +
            '<span>Status <p class="appStatus">' + data[i].Status + '</p></span>' +
            '<span>Date Requested<p class="appRequested">' + createdate(data[i].Created) + '</p></span>' +
            '<span>Date Issued<p class="appIssued">' + createdate(data[i].Expires) + '</p></span>' +
            '<span>Details<p class="appDetails">' + data[i].Description + '</p></span>' +
            ' </div>';
        appointmentList.innerHTML += appointment;
    }
}



function login(user) {
    var loginDoc = document.getElementById('doctorLoginform')
    var loginPat = document.getElementById('patLoginForm')
    console.log(user);
    if (user == "doctor") {
        loginDoc.addEventListener('submit', (event) => {
            event.preventDefault();
            fetch("http://localhost:3000/login", {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)),
                headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
            }).then((resp) => {
                return resp.json();
            }).then(body => {
                if (body.message.includes("ncorrect")) {
                    document.getElementById("errorMessage").innerHTML = body.message
                } else {
                    body.doctor.isDoctor = true
                    window.sessionStorage.setItem('user', body.doctor.Id)
                    location.href = "./homepagedoc.html"
                }
            })
        }
        )
    } else if (user == "patient") {

        loginPat.addEventListener('submit', (event) => {
            event.preventDefault();
            fetch("http://localhost:3000/login", {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)),
                headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
            }).then((resp) => {
                return resp.json();
            }).then(body => {
                if (body.message.includes("ncorrect")) {
                    document.getElementById("errorMessage").innerHTML = body.message
                } else {
                    body.patient.isDoctor = false
                    window.sessionStorage.setItem('user', JSON.stringify(body.patient))
                    location.href = "./homepage.html"
                }
            })
        }
        )
    }
}

// var patRegister = document.getElementById('patientRegistration')
// console.log("jfajj"+patRegister);
function register(user) {
    console.log(user);
    var docRegister = document.getElementById('doctorRegistration')
    var patRegister = document.getElementById('patientRegistration')
    // console.log(docRegister);
    // console.log(patRegister);
    if (user == "doctor") {
        docRegister.addEventListener('submit', (event) => {
            event.preventDefault();
            fetch("http://localhost:3000/register", {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)),
                headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
            }).then((resp) => { return resp.json(); }).then(body => console.log(body))
        })
    }
    else if (user == "patient") {
        console.log("got in");
        patRegister.addEventListener('submit', (event) => {
            event.preventDefault();
            fetch("http://localhost:3000/register", {
                method: 'POST',
                body: new URLSearchParams(new FormData(event.target)),
                headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
            }).then((resp) => { return resp.json(); }).then(body => console.log(body))
        })
    }
}



function loadPrescriptions() {
    console.log("function");
    var user = JSON.parse(window.sessionStorage.getItem('user'))
    console.log(user);
    if (user.isDoctor) {
        fetch("http://localhost:3000/prescriptions/doctors/" + user.Id, {
            method: 'GET',
            // body: new URLSearchParams(new FormData(event.target)),
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        }).then((resp) => { return resp.json(); }).then(body => console.log(body))
    }
    else {
        fetch("http://localhost:3000/prescriptions/patients/" + user.Id, {
            method: 'GET',
            // body: new URLSearchParams(new FormData(event.target)),
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        }).then((resp) => { return resp.json(); }).then(body => console.log(body))
    }

}

function loadAppointments() {

    var user = JSON.parse(window.sessionStorage.getItem('user'))
    console.log(user);
    if (user.isDoctor) {
        fetch("http://localhost:3000/appointments/doctors/" + user.Id, {
            method: 'GET',
            // body: new URLSearchParams(new FormData(event.target)),
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        }).then((resp) => { return resp.json(); }).then(body => { writeAppointments(body) })
    } else {
        fetch("http://localhost:3000/appointments/patients/" + user.Id, {
            method: 'GET',
            // body: new URLSearchParams(new FormData(event.target)),
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        }).then((resp) => { return resp.json(); }).then(body => { writeAppointments(body) })
    }

}

function requestAppointment() {
    
    var newappointment = document.getElementById('requestNewFormCont')
    var user = JSON.parse(window.sessionStorage.getItem('user'))
    console.log(newappointment);
    newappointment.addEventListener('submit', (event) => {
        var formatData =new FormData(event.target)
        formatData.append("PatientId",user.Id)
        event.preventDefault();
        fetch("http://localhost:3000/appointments", {
            method: 'POST',
            body: new URLSearchParams(formatData),
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        }).then((resp) => { return resp.json(); }).then(body => console.log(body))
    })
}
function requestPrescription() {
    console.log(user);
    var newappointment = document.getElementById('requestNewFormContPres')
    var user = JSON.parse(window.sessionStorage.getItem('user'))
    newappointment.addEventListener('submit', (event) => {
        event.preventDefault();
        var formatData =new FormData(event.target)
        formatData.append("PatientId",user.Id)
        fetch("http://localhost:3000/prescriptions", {
            method: 'POST',
            body: new URLSearchParams(new FormData(event.target)),
            headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' }
        }).then((resp) => { return resp.json(); }).then(body => console.log(body))
    })
}
