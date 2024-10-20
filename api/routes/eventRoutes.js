'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController');
const emailer= require("../controllers/emailer");
const router = express.Router();
const googleSheet = require("../controllers/googleSheet");

router.get('/unsubscribe/:id/:status', eventControll.unsubscribe);
router.get('/enquiry/:firstname/:lastname/:email/:phone/:eventdate', eventControll.enquiry);
router.get('/getCamps', emailer.getcamps);
router.post('/email', emailer.sendmail);
router.get('/getreviews', emailer.getGoogleReviews);
router.get('/fetchsheetdata', googleSheet.fetchSheetData);
router.get('/fetchmenudata', googleSheet.fetchMenuData);
router.get('/fetchmenudata1', googleSheet.fetchMenuData1);
router.get('/fetchpagedata', googleSheet.fetchPageData);

module.exports = {
    routes: router
}