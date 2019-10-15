const Router = require("express").Router();
const { ensureAuthenticated, ensureIsAdmin } = require('../../config/auth');

const Project = require("../../models/projectModel");


Router.get("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    return res.render("project/create", { req });
});


Router.post("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const errors = [];
    const { name, budget } = req.body;

    if (!name || !budget) {
        errors.push({ msg: 'Please fill all fields' });
        return res.redirect("/project/create");
    }

    if (errors.length > 0) {
        req.flash(
            'error_msg',
            "Please fill all fields"
        );
        return res.redirect("/project/create");
    }


    const newProject = new Project({
        name,
        budget: amount.replace(/[-,a-zA-Z]/g, "")
    });

    if (newProject.budget == "") newProject.budget = 0;

    newProject.save()
        .then((project) => {
            return res.redirect("/project/" + project._id);
        })
})

module.exports = Router;