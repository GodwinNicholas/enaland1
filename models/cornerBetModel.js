const mongoose = require("mongoose");


const Bet = new mongoose.Schema({
    players: {
        type: Array,
        default: [],
        required: true
    },
    potentialWin: {
        type: String,
        required: true,
    },
    date: {
        type: Date
    },
    verified: {
        type: Boolean,
        default: true
    }
});


module.exports = Bet = mongoose.Model("Bet", Bet);