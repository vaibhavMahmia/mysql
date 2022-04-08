const express = require('express');
const hbs = require('hbs');
const path = require("path");
const mysql = require('mysql');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const templatepath = path.join(__dirname, "../templates/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
app.set('view engine', 'hbs');
app.set('views', templatepath);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myDatabase"
});

app.get("/", (req, res) => {
    res.render('index');
});

app.post('/',function(req,res){

    var value=req.body.value;
    var value2=req.body.value2;
    
  
    con.connect(function(err) {
    if (err) throw err;
    var sql = `INSERT INTO test VALUES ("${value}" , "${value2}")`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        req.flash('success', 'Data added successfully!');
        res.redirect('/');
    });
    });
    
  })

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});