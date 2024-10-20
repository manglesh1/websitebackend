"use strict";

const https = require("https");
const NodeCache =require("node-cache")

const cache = new NodeCache({ stdTTL: 86400 });
const getGoogleReviews = async (req, res, next) => {
    const reviewKey=req.query.locationid;
   const cachedData = cache.get(reviewKey);
  const url= "https://maps.googleapis.com/maps/api/place/details/json?fields=rating,reviews&key=AIzaSyDfOsv-WRB882U3W1ij-p3Io2xe5tSCRbI&placeid=ChIJGyCHh8EqO4gRRvfWE34-pts"
   if (cachedData || req.query.istest) {
    console.log('Serving from cache');
    res.status(200).send(cachedData);    
    return;
  }
  

   https
    .get(url, resp => {
      console.log(req.query.url);
      let data = "";      
      resp.headers["content-type"]="text/html";
      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });  
      // The whole response has been received. Print out the result.
      resp.on("end", () => {
       //console.log(data);
      // JSON.stringify(data);

      var o = JSON.parse(yourJsonString);
      
      o.result.reviews.forEach(function(value){
        console.log(value);
      });


       //cache.set(reviewKey,data);
           res.status(200).send(data)  ;
      });
    })
    .on("error", err => {
      console.log('error dekho');
      console.log("Error: " + err.message);
    });
  }
  module.exports = {
    getGoogleReviews
}