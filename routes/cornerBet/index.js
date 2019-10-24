const express = require("express");
const Router = express.Router();
const Bet = require("../../models/cornerBetModel");

// Express body parser
Router.get("/", (req, res) => {
    Bet.find({})
        .then(bets => {
            return res.render("cornerBet/index", { bets });
        })
});

// rest api
// push ticket to database
Router.get("/ticket/:players/:stake/:potWin/:date", (req, res) => {
    const { potWin, stake, date, players } = req.params;
    if (!potWin) {
        return res.redirect("/cornerBet");
    }
    newBet = new Bet({
        players,
        potWin,
        date,
        stake
    });

    newBet.save()
        .then(() => {
            return res.send(newBet);
        });
});

Router.get("/ticket/print/:id", (req, res) => {
    if (!req.params.id) {
        return res.redirect("/cornerBet");
    }
    Bet.findOne({ _id: req.params.id }, (err, ticket) => {
        players = ticket.players.split(" ");
        return res.render("cornerBet/ticketPage", { ticket, players });
    });
});

// update recently added tickests
Router.post("/ticket/update", (req, res) => {

});


module.exports = Router;

