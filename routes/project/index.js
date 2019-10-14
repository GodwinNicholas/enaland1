const Router = require("express").Router();
const Users = require("../../models/userModel");
const { ensureAuthenticated, ensureIsAdmin } = require('../../config/auth');


Router.get("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    res.render("project/index", { project: 1, req })
});

module.exports = Router;