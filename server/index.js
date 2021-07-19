const express = require('express') ;
const mysql =  require('mysql');
const cors = require('cors');
const Nexmo = require('nexmo');

var md5 = require('md5');

const nexmo = new Nexmo({
	apiKey: '758148e8',
	apiSecret: 'niIL9iufJ8H7dfNW',
});
const from = "FAS for WKU";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "faswu",
    // database: "try",
});

db.connect(function(err){
    if(err){
        throw err;
    }
    console.log("connected to database")
})

app.post('/registration', (req,res) => {

    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const LastName = req.body.lastname
    const PhoneNumber = req.body.phonenumber
    const Email = req.body.email
    const Password = req.body.password

    db.query(
        "INSERT INTO user (first_name, middle_name, last_name, phone_number, email, password) VALUES (?,?,?,?,?,?)", 
    [FirstName, MiddleName, LastName, PhoneNumber, Email,  md5(Password)],
    (err, result) => {
        console.log(err);
    });
});

app.post("/login", (req,res) => {
    const Email = req.body.email
    const Password = req.body.password 

    db.query(
        "SELECT * FROM user WHERE email = ? AND password = ?",
    [Email,  md5(Password)],
    (err, result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Incorrect email/password !"});
            console.log(md5(Password));
        }
    });
});

app.post("/registrar", (req,res) => {
 
    db.query(
        "SELECT * FROM registrar",
    (err, result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Incorrect email/password !"});
        }
    });
});

app.delete("/registrar/delete/:college", (req,res) => {

    const sqlDelete = "DELETE FROM registrar WHERE college = ? ";

var College_Name = req.params.college;
if (College_Name.includes(",")){
    var eachCollege = College_Name.split(",");
    for (var key in eachCollege){
var temp = eachCollege[key];
          db.query(sqlDelete, temp, (err, result) => {
              if (err) console.log(err);
              else console.log(result);
          })
    }
}
else{
    db.query(sqlDelete, College_Name, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
    })
}
  console.log("college Name : " + College_Name);
});

app.post('/createRegistrar', (req,res) => {

    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const LastName = req.body.lastname
    const Gender = req.body.gender
    const Email = req.body.email
    const PhoneNumber = req.body.phonenumber
    const College = req.body.college
    const Password = req.body.password

    db.query(
        "INSERT INTO registrar (first_name, middle_name, last_name, sex, email, phone_number, college, password) VALUES (?,?,?,?,?,?,?,?)", 
    [FirstName, MiddleName, LastName, Gender, Email, PhoneNumber, College, md5(Password) ],
    (err, result) => {
        console.log(result);
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


        // const to = "+251"+PhoneNumber;
        // const text = "Hello "+FirstName+" use "+Email+" & "+Password+" to login !!";

        // var result = nexmo.message.sendSms(from, to, text); 

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
});



app.post('/createUserFromRegistrar', (req,res) => {

    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const Email = req.body.email
    const Password = req.body.password
    const Role = req.body.role
    const College = req.body.college

    db.query(
        "INSERT INTO user (first_name, middle_name, email, password, role, college) VALUES (?,?,?,?,?,?)", 
    [FirstName, MiddleName, Email, md5(Password), Role, College ],
    (err, result) => {
        console.log(result);
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



        // const to = "+251"+PhoneNumber;
        // const text = "Hello "+FirstName+" use "+Email+" & "+Password+" to login !!";

        // var result = nexmo.message.sendSms(from, to, text); 

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
});

//          Dean

app.post('/createDean', (req,res) => {

    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const LastName = req.body.lastname
    const Gender = req.body.gender
    const Email = req.body.email
    const PhoneNumber = req.body.phonenumber
    const College = req.body.college
    const Password = req.body.password
    const Role = req.body.role

    db.query(
        "INSERT INTO dean (first_name, middle_name, last_name, sex, email, phone_number, college, password, role) VALUES (?,?,?,?,?,?,?,?,?)", 
    [FirstName, MiddleName, LastName, Gender, Email, PhoneNumber, College, md5(Password), Role ],
    (err, result) => {
        console.log(result);
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


        // const to = "+251"+PhoneNumber;
        // const text = "Hello "+FirstName+" use "+Email+" & "+Password+" to login !!";

        // var result = nexmo.message.sendSms(from, to, text); 

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
});



app.post('/createUserFromDean', (req,res) => {

    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const Email = req.body.email
    const Password = req.body.password
    const Role = req.body.role
    const College = req.body.college

    db.query(
        "INSERT INTO user (first_name, middle_name, email, password, role, college) VALUES (?,?,?,?,?,?)", 
    [FirstName, MiddleName, Email, md5(Password), Role, College],
    (err, result) => {
        console.log(result);
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



        // const to = "+251"+PhoneNumber;
        // const text = "Hello "+FirstName+" use "+Email+" & "+Password+" to login !!";

        // var result = nexmo.message.sendSms(from, to, text); 

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
});


//      ~~~~~~~~~~


//          Head

app.post('/createHead', (req,res) => {

    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const LastName = req.body.lastname
    const Gender = req.body.gender
    const Email = req.body.email
    const PhoneNumber = req.body.phonenumber
    const College = req.body.college
    const Department = req.body.department
    const Password = req.body.password
    const Role = req.body.role

    db.query(
        "INSERT INTO head (first_name, middle_name, last_name, sex, email, phone_number, college, department, password, role) VALUES (?,?,?,?,?,?,?,?,?,?)", 
    [FirstName, MiddleName, LastName, Gender, Email, PhoneNumber, College, Department, md5(Password), Role ],
    (err, result) => {
        console.log(result);
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


        // const to = "+251"+PhoneNumber;
        // const text = "Hello "+FirstName+" use "+Email+" & "+Password+" to login !!";

        // var result = nexmo.message.sendSms(from, to, text); 

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
});



app.post('/createUserFromHead', (req,res) => {

    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const Email = req.body.email
    const Password = req.body.password
    const Role = req.body.role
    const College = req.body.college
    const Department = req.body.department

    db.query(
        "INSERT INTO user (first_name, middle_name, email, password, role, college, department) VALUES (?,?,?,?,?,?,?)", 
    [FirstName, MiddleName, Email, md5(Password), Role, College, Department],
    (err, result) => {
        console.log(result);
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



        // const to = "+251"+PhoneNumber;
        // const text = "Hello "+FirstName+" use "+Email+" & "+Password+" to login !!";

        // var result = nexmo.message.sendSms(from, to, text); 

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
});


//      ~~~~~~~~~~

//      ~~~~~~~~~~~~~~~~~~~


app.post('/addStudent', (req,res) => {

    const SchoolId = req.body.schooolid
    const FingerPrintId = req.body.fingerprintid
    const FirstName = req.body.firstname
    const MiddleName = req.body.middlename
    const LastName = req.body.lastname
    const Gender = req.body.gender
    const Email = req.body.email
    const PhoneNumber = req.body.phonenumber
    const College = req.body.college
    const Department = req.body.department
    const Batch = req.body.batch
    const Role = req.body.role

    db.query(
        "INSERT INTO student (school_id, fingerprint_id, first_name, middle_name, last_name, sex, email, phone_number, college, department, batch, role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
    [SchoolId, FingerPrintId, FirstName, MiddleName, LastName, Gender, Email, PhoneNumber, College, Department, Batch, Role ],
    (err, result) => {
        console.log(err);
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


        // const to = "+251"+PhoneNumber;
        // const text = "Hello "+FirstName+" use "+Email+" & "+Password+" to login !!";

        // var result = nexmo.message.sendSms(from, to, text); 

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    });
});


//          ================================

app.post("/view_profile", (req,res) => {
    const Email = req.body.email
console.log("from server "+Email);
    db.query(
        "SELECT * FROM user WHERE email = ?",
    [Email],
    (err, result) => {
        if (err) {
            res.send({err: err});
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({message: "Incorrect email/password !"});
            console.log(email);
        }
    });
});


app.listen(3001, () => {
    console.log("running server on port 3001");
});
