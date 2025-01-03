//Importing Credentials
const credentials = require('./credentials.js');

//Intializing the backend app
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Make server use cors middleware to bypass cors error so the front-end and back-end can be listening top different ports
const cors = require('cors');
const fileUpload=require("express-fileupload");
app.use(cors());
app.use(fileUpload());

//Connecting to Database
mongoose.connect(credentials.dbURL)
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(8080);
})
.catch((err)=>{console.log(err)});

//Parsing the HTTP Request
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Starting Session
const session=require('express-session');
app.use(session({
    secret: credentials.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

//Setting up routing
const IndexRoutes=require('./routes/index.routes.js');
const UserRoutes=require('./routes/user.routes.js');
const CompanyRoutes=require('./routes/company.routes.js')
app.use('/',IndexRoutes);
app.use('/user',UserRoutes);
app.use('/company',CompanyRoutes)

app.use((req,res)=>{
    res.sendStatus(404);
})