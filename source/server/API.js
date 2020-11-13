"use strict"

/*
    This file is for functions that connect the Hotel Info API to main backend, server.js
*/

class Listing{
    constructor(name, address, bedNums, preTaxNight,
        features, checkin, checkout, images, contactNum, rating){
        this.name = name;
        this.address = address;
        this.bedNums = bedNums;
        this.preTaxNight = preTaxNight;
        this.features = features; // list
        this.checkin = checkin;
        this.checkout = checkout;
        this.images = images; // list
        this.contactNum = contactNum;
        this.rating = rating;
    }
}

class Bed{
    constructor(name){
        this.name = name; // Full, King or Queen
    }
}

//This function will acess the API and maybe create a JS Listing Obeject array, right now it generates random data
function search(searchText, daterange, numBeds){    
    let listings = [];
    for(let i = 0; i < 20; i++){
        let random = Math.floor(Math.random() * 100)
        listings[i] = new Listing("Hotel " + random, random + " rd NY", random, random *3, 
        ["feature " + (random + 3), "feature " + (random + 3), "feature " + (random + 3)],
        "What is this?", "What is this?", ["imgURL1", "imgURL2", "imgURL3"], "(231) 712-2312", random);
    }
    return listings;
}

exports.search = search;

