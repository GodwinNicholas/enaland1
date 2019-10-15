const Router = require("express").Router();
const { ensureAuthenticated, ensureIsAdmin } = require('../../config/auth');


Router.get("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    res.render("project/details", { req })
});

module.exports = Router;