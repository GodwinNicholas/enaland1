const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    return res.send("cornerBet/index.html");
});



// rest apis

// fetch tickets from database
router.get("/ticket", (req, res) => {

});

// push ticket to database
router.post("/ticket", (req, res) => {

});


// update recently added tickests
router.post("/ticket/update", (req, res) => {

});


module.exports = router;

