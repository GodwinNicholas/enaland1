const Router = require("express").Router();
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { ensureAuthenticated } = require('../config/auth');
const moment = require("moment");

Router.get("/", ensureAuthenticated, (req, res) => {
    const user = req.user;
    if (!user.isAdmin) {
        Transaction.find({ ["cashier._id"]: user._id }).sort({ date: 1, time: 1 })
            .then(trans => {
                res.render("home", { trans, req, user });
            });
    }
    Transaction.find().sort({ date: -1 })
        .then(trans => {
            res.render("home", { trans, req, user, moment });
        });
});

Router.post("/", ensureAuthenticated, (req, res) => {
    const user = req.user

    const { name, clientName, imgURI, amount, fee, bankName, refNum, accNum, customerNum, type, status, card } = req.body;

    let errors = [];


    if (!name || !clientName || !amount || !fee || !bankName || !refNum || !accNum || !type || !status || !card) {
        errors.push({ msg: 'Password fill all fields' })
    }

    if (type == "Debit" && parseInt(user.cash) < amount) {
        req.flash(
            'error_msg',
            "Insufficient balance"
        );
        return res.redirect("/");
    }

    if (errors.length > 0) {
        Transaction.find()
            .then(trans => {
                return res.render("home", { trans, req, user, msg: "Please fill all fields!" });
            });
    }

    const newTransaction = new Transaction({
        name,
        clientName,
        amount: amount.replace(/[-,]/g, ""),
        fee: fee.replace(/[-,]/g, ""),
        imgURI,
        bankName,
        refNum: refNum.replace(/[-,]/g, ""),
        accNum: accNum.replace(/[-,]/g, ""),
        customerNum: customerNum.replace(/[-,]/g, ""),
        type,
        status,
        card,
        cashBal: user.cash,
        cashier: user
    })




    newTransaction.save()
        .then(() => {
            // deduct user balance
            if (type == "Debit") {
                const newCash = user.cash - parseInt(amount.replace(/[-,]/g, ""));
                User.updateOne({ username: user.username }, { cash: newCash }, { upsert: true }).then(user => {
                    console.log("");
                })
            }
            if (type == "Credit") {
                const newCash = parseInt(user.cash) + parseInt(amount.replace(/[-,]/g, ""));
                User.updateOne({ username: user.username }, { cash: newCash }, { upsert: true }).then(user => {
                    console.log("");
                })
            }

            req.flash(
                'success_msg',
                'Record Scucessfully added'
            );
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
            req.flash(
                'error_msg',
                'Failed to add record'
            );
            res.redirect("/");
        })

})


module.exports = Router;