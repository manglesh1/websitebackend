'use strict';
const eventData = require('../data/events');
const https = require("https");
const unsubscribe = async (req, res, next) => {
    try {
        
        const result = await eventData.unsubscribe(req.params.id,req.params.status);
       if(result===1){
        res.send({status:200,data:result,msg:'updated sucessfully!'});      
       }else{
        res.send({status:400,data:result,msg:'updated not sucessfully!'}); 
       }  
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const enquiry = async (req, res, next) => {
    try {
        const data = req.params;
        const insert = await eventData.creatInquiry(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    unsubscribe,
    enquiry
}