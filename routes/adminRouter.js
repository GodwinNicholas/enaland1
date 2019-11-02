const Router = require("express").Router();
const Users = require("../models/userModel");
const { ensureAuthenticated, ensureIsAdmin } = require('../config/auth');
const User = require("../models/userModel");

Router.get("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    Users.find({ isAdmin: false })
        .then(users => {
            return res.render("admin", { req, users });
        })
});


Router.post("/transaction", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const { user, amount, transaction, note } = req.body;

    if (!user || !amount || !transaction || !note) {
        req.flash(
            'error_msg',
            'Please enter all fields'
        );
        return res.redirect('/admin');
    }

    if (transaction == "Deposit" && parseInt(req.user.cash.replace(/[,-]/g, "")) < amount) {
        req.flash(
            'error_msg',
            'You do not have sufficient funds'
        );
        return res.redirect('/admin');
    }

    User.findOne({ _id: user })
        .then(user => {
            if (user) {
                if (transaction == "Withdraw" && user.cash < amount) {
                    req.flash(
                        'error_msg',
                        'User does not have sufficient funds'
                    );
                    return res.redirect("/admin");
                }

                if (transaction == "Withdraw") {
                    const newCash = parseInt(user.cash.replace(/[-,a-zA-Z]/g, "")) - parseInt(amount.replace(/[-,a-zA-Z]/g, ""));
                    const newAdminCash = parseInt(req.user.cash) + parseInt(amount.replace(/[-,a-zA-Z]/g, ""));
                    User.updateOne({ _id: user.id }, { cash: newCash }, { upsert: true })
                        .then(() => {
                            User.updateOne({ _id: req.user.id }, { cash: newAdminCash }, { upsert: true })
                                .then(() => {
                                    req.flash(
                                        'success_msg',
                                        'Transaction successful'
                                    );
                                    return res.redirect("/admin");
                                })
                        })
                }

                if (transaction == "Deposit") {
                    const newCash = parseInt(user.cash.replace(/[-,a-zA-Z]/g, "")) + parseInt(amount.replace(/[-,a-zA-Z]/g, ""));
                    const newAdminCash = parseInt(req.user.cash) - parseInt(amount.replace(/[-,a-zA-Z]/g, ""));
                    User.updateOne({ _id: user.id }, { cash: newCash }, { upsert: true })
                        .then(() => {
                            User.updateOne({ _id: req.user.id }, { cash: newAdminCash }, { upsert: true })
                                .then(() => {
                                    req.flash(
                                        'success_msg',
                                        'Transaction successful'
                                    );
                                    return res.redirect("/admin");
                                })
                        })
                }

            }
        })



    res.redirect("/admin")
});






module.exports = Router;