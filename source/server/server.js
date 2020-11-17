
"use strict";

let process = require('process');
process.chdir(__dirname);

//================= Lib Imports ========================================================================================

const express = require("express");
const session = require("express-session");
const HotelAPI = require("./API");
const DatabaseInterface = require("./database");
const path = require('path');

//================= Express and Routing Setip ==========================================================================

let app = express(); //initilize the express app
const SESSION_LIFETIME = 1000 * 60 * 60 * 2 // 2 hours

//Routing Setup
app.use(express.static("../client/")); //use default static routing for anything not specified
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "GarlicEpicSecretCode",
    cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: false
    }
})); //set up sessions with a unique secret for ID generation

// set views
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'pug');

//use index.html as our homepage, send it when "root page" is requested
app.get("/", function (req, res) {
  console.log(req.session)
  res.render("index.pug", {
      user: req.session.user
  })
});

// Login/Register page
app.get("/loginregister", function (req, res) {
    if(req.session.user){
        res.redirect("/");
    }else{
        res.render("loginregister.pug", {
            user: req.session.user
        });
    }
});

// Settings Page
app.get("/settings", function (req, res) {
    if(req.session.user){
        res.render("settings.pug", {
            user: req.session.user
        })
    }else{
        res.redirect("/")
    }
});

app.get("/logout", function (req, res) {
    if(req.session.user){
        req.session.user = null;
    }
    res.redirect("/")
});

//================== Endpoint Handlers ===================================================================================

//Handle search requests
app.get("/GarlicSearchEndpoint", function (req, res) {
  let searchText = decodeURI(req.query.search);
  let dateRange = decodeURI(req.query.dates);
  let beds = decodeURI(req.query.beds);
  console.log("Recived Request to search for " + searchText + " " + dateRange + " " + beds);
  let listingObject = HotelAPI.search(searchText); //Call our hotel search interface in API.js
  res.json(listingObject);
});

//Account Creation Handling
app.get("/GarlicAccountCreationEndpoint", function(req, res){
    console.log("User Creation Query");
    console.log(req.query);
    if(!req.session || !req.session.user){  //If there is no session or session has no associated user
        let newUserReturnObject = DatabaseInterface.newUser(req.query);
        if(newUserReturnObject.errors.length == 0)  //If there were no user creation errors
            req.session.user = newUserReturnObject.user;
        return res.json(newUserReturnObject.makeClientSafe());
        //return res.redirect("/");
    }
    return res.json(new DatabaseInterface.UserRes(null, ["Can not create an account while having an active user session"]));
});


//Login / Authentication Handling
app.get("/GarlicAuthEndpoint", function(req, res){ 
    console.log("User Login Query");
    console.log(req.query);
    if(!req.session || !req.session.user){  //If there is no session or session has no associated user
        let newUserReturnObject = DatabaseInterface.authenticate(req.query);
        if(newUserReturnObject.errors.length == 0)  //If there were no user creation errors
            req.session.user = newUserReturnObject.user;
        return res.json(newUserReturnObject.makeClientSafe());
        //return res.redirect("/")
    }
    return res.json(new DatabaseInterface.UserRes(null, ["Can not login to an account while already logged in"]));
});

//Update Handling
app.get("/GarlicUpdateUserEndpoint", function(req, res){ 
    console.log("User Update Query");
    console.log(req.body);
});

app.listen(8080);
