const Router = require("express").Router();
const Users = require("../models/userModel");
const { ensureAuthenticated, ensureIsAdmin } = require('../config/auth');

Router.get("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    Users.find()
        .then(users => {
            res.render("admin", { req, users });
        })
});



module.exports = Router;