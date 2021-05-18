const express = require('express')
const bcrypt = require("bcrypt")
const config = require("./config/config")
const userRouter = require('./routes/usersRouter')
const prescriptionRouter = require('./routes/prescriptionRouter')
const apponintmentRouter = require('./routes/appointentRouter')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


config.db.authenticate().then(()=>console.log('Connection has been established successfully.')).catch(err=>console.error('Unable to connect to the database:', err));

app.use(express.urlencoded({
  extended: true
}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header(`Access-Control-Allow-Headers`, '*');

next();})

app.use(bodyParser.json());
app.use('/', userRouter);
app.use('/prescriptions', prescriptionRouter);
app.use('/appointments', apponintmentRouter)

app.get('/hw', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})