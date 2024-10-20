"use strict";

const nodemailer = require("nodemailer");
const https = require("https");
const NodeCache =require("node-cache")
// async..await is not allowed in global scope, must use a wrapper
const sendmail =  async (req,res,next) =>{
  try {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "email-smtp.ca-central-1.amazonaws.com",
    port: 2587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "AKIARBYO3HCNLODELX7B", // generated ethereal user
      pass: "BMWV7HVhaWrgjT5uJRBQtQYn8aLenSuJpN7qeYnp7oM0", // generated ethereal password
    },
    
  });
  console.log(req.body);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "partyoakville@aerosportsparks.ca", // sender address
    to: req.body.locationEmail, // list of receivers
    subject: req.body.subject, // Subject line
    replyTo:req.body.email,
    //text: req.message, // plain text body
    html: "<p>Event Date:" + req.body.eventDate +" "+ req.body.eventtime  + "<br/> Name:" + req.body.name +"<br/>phone:"+ req.body.phone + "<br/>" + req.body.message , // html body
  });
  console.log("after send");

res.status(200).send();

} catch (error) {
  console.log(error);
  res.status(400).send(error.message);
} 
}



// async..await is not allowed in global scope, must use a wrapper
const sendKoalamail = async (req, res, next) => {
  try {
    // Configuring the transporter for Office 365
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports like 587
      auth: {
        user: "sales@koalakidz.ca", // Your Office 365 email address
        pass: "Qaj68718", // Your Office 365 password
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Set up email data
    console.log(req.body);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "sales@koalakidz.ca", // sender address
    to: req.body.locationEmail, // list of receivers
    subject: req.body.subject, // Subject line
    replyTo:req.body.email,
    //text: req.message, // plain text body
    html: "<p>Event Date:" + req.body.eventDate +" "+ req.body.eventtime  + "<br/> Name:" + req.body.name +"<br/>phone:"+ req.body.phone + "<br/>" + req.body.message , // html body
  });
  console.log("after send");

    res.status(200).send();

    console.log("Message sent: %s", info.messageId);
   
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).send('Failed to send email');
  }
};




const cache = new NodeCache({ stdTTL: 86400 });
const getcamps = async (req, res, next) => {
 
  const cachedData = cache.get(req.query.url);

  if (cachedData || req.query.istest) {
    console.log('Serving from cache');
    res.status(200).send(cachedData);
    
    return;
  }
  

  console.log('getcampsstart');
  console.log(req.query.url);
  https
    .get(req.query.url, resp => {
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
       cache.set(req.query.url,data);
           res.status(200).send(data)  ;
      });
    })
    .on("error", err => {
      console.log('error dekho');
      console.log("Error: " + err.message);
    });
  }

  
  const getGoogleReviews = async (req, res, next) => {
    const reviewKey = req.query.locationid;
    if ((reviewKey === 'undefined' || reviewKey === null || !reviewKey.startsWith('Ch'))) {
      res.status(200).send("incorrect input");
      return;
    }
    
    const cachedData = cache.get(reviewKey);
    const url = "https://maps.googleapis.com/maps/api/place/details/json?fields=rating,reviews&key=AIzaSyDfOsv-WRB882U3W1ij-p3Io2xe5tSCRbI&placeid=" + reviewKey;

    if (cachedData || req.query.istest) {
        console.log('Serving from cache');
        res.status(200).send(cachedData);
        return;
    }

    let parsedData;
    getapidata(url)
        .then(data => {
            parsedData = JSON.parse(data);
            parsedData.result.reviews = parsedData.result.reviews.filter(review => review.rating >= 4); // Filter reviews with 4+ stars
            console.log(parsedData.result);
            return getapidata(url + '&reviews_sort=newest'); // Returning this Promise to chain it
        })
        .then(data1 => {
            const parsedData1 = JSON.parse(data1);
            parsedData1.result.reviews.forEach(e => {
                if (e.rating >= 4) {
                    parsedData.result.reviews.push(e);
                }
            });
            console.log(parsedData.result);
            cache.set(reviewKey, parsedData.result);
            res.status(200).send(parsedData.result);
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors here
            res.status(500).send({ error: 'An error occurred while fetching reviews' }); // Send error response
        });
}

  const getapidata = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, resp => {
            let data = "";
            resp.on("data", chunk => {
                data += chunk;
            });

            resp.on("end", () => {
                resolve(data); // Resolve the promise with the fetched data
            });
        }).on("error", err => {
            reject(err); // Reject the promise if there's an error
        });
    });
};
module.exports = {
  sendmail,
  getcamps,
  getGoogleReviews,
  sendKoalamail
}