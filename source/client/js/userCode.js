
/*
    This file contatins all frontend code involved with the user inclduing
        User Creation
        CredentialValidation also used server side 
        User Validation
        Settings update


    Do not change the export style to ES6 modules, keep it CommonJS for Node
*/

//================ USER CREATION ====================================================================================================

//Use this function to set up the frontend to display errors durring user creation
function newUserError(errors){
    for(let i = 0; i < errors.length; i++)  //Right now it just console.error s all issues
        console.error("User Creation Error:" + errors[i]);
}

//Use this function to set up the frontend to display sucess after an account is sucessfully created, user is a SafeUser Object defined in /src/server/database.js
function newUserSuccess(user){
    console.log("Account Suceffully Created! You were automatically logged in.")
    console.log(user);
}

//We run these both client and server side to ensure only things that really pass this get into the database
//THIS IS THE ONLY FUNCTION THAT SHOULD BE USED FRONT END AND BACKEND, DO NOT PUT NODE OR FRONTEND EXCLUSIVE CODE IN HERE
function credValidation(username, password, email, phone){
    // configs // Stolen from ethans old validator
    const PW_MIN_LENGTH = 8;
    const PW_MAX_LENGTH = 69; //set to whatever the db supports (or we could just set it to 16 lmao)
    const UN_MIN_LENGTH = 3;
    const UN_MAX_LENGTH = 16;
    const EM_MAX_LENGTH = 30;
    let errors = []; 
    if(username.length < UN_MIN_LENGTH || username.length > UN_MAX_LENGTH)      //Check usernames meet length requirements
        errors.push("Usernames must be between " + UN_MIN_LENGTH + " and " + UN_MAX_LENGTH + "chars");
    if(password.length < PW_MIN_LENGTH || password.length > PW_MAX_LENGTH)      //Check passwords meet length requirements
        errors.push("Passwords must be between " + PW_MIN_LENGTH + " and " + PW_MAX_LENGTH);
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/.test(password))           //Check passwords meet complexity requirements
        errors.push("Password must contain at least one lowercase, one uppercase, and one number" + "chars");
    if(email.length > EM_MAX_LENGTH)
        errors.push("Email address must be less then " + EM_MAX_LENGTH + " chars.");
    if(phone != "" && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone))
        errors.push("Invalid Phone Number!");
    if(email != "" && !/\S+@\S+\.\S+/.test(email))
        errors.push("Invalid Email!");
    return errors;
}

//export cred validation so it can be used backend
exports.credValidation = credValidation;

//This function will be called by the frontend when a new user is to be created
function newUser(){
    //Get New User Data
    let username = document.getElementById("user").value; 
    let password = document.getElementById("pw").value;
    let confirmPassword = document.getElementById("pwCheck").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    //Check for errors client side first to free up server processing time
    let errors = credValidation(username, password, email, phone)   //Check credential properties, need to be re-checked backend
    if(password != confirmPassword)                   //Check passwords match
        errors.push("Passwords do not match!");
    if(errors.length != 0){
        newUserError(errors); 
        return;
    }

    //Since we're using HTTPS we can send the raw username and password
    let request = "/GarlicAccountCreationEndpoint?username=" + encodeURI(username) + "&password=" + encodeURI(password) + "&email=" + encodeURI(email) + "&phone=" + encodeURI(phone);
    console.log("Requesting" + request)
    fetch(request)
    .then(response => response.json())              //convert return data to json
    .then(function(response){   //Callback from backend
        if(response.errors.length != 0){
            newUserError(response.errors);
            return;
        }
        newUserSuccess(response.user);
    }).catch(function(reason){  //Unexpected fetch fault 
        newUserError(["Unexpected new user fetch() fault: " + reason]);
    });
} 

exports.newUser = newUser;

//============== User Login ======================================================================================


function userLoginError(errors){
    for(let i = 0; i < errors.length; i++)  //Right now it just console.error s all issues
        console.error("User authentication Error:" + errors[i]);
}

function userLoginSuccess(userDetails){
    console.log("You are successfully logged in as " + userDetails.username);
}

function userLogin(){
    let username = document.getElementById("userLogin").value;
    let password = document.getElementById("pwLogin").value;
    let request = "/GarlicAuthEndpoint?username=" + encodeURI(username) + "&password=" + encodeURI(password);
    fetch(request)
    .then(response => response.json())              //convert return data to json
    .then(function(response){   //Callback from backend
        if(response.errors.length != 0){
            userLoginError(response.errors);
            return;
        }
        userLoginSuccess(response.user);
    }).catch(function(reason){  //Unexpected fetch fault 
        userLoginError(["Unexpected new user fetch() fault: " + reason]);
    });
}

exports.userLogin = userLogin;