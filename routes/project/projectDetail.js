const Router = require("express").Router();
const { ensureAuthenticated, ensureIsAdmin } = require('../../config/auth');
const Project = require("../../models/projectModel");
const uuid = require("uuid")

Router.get("/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(project => {
            res.render("project/details", { project, req })
        })
});


// add expenses
Router.post("/expenses/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const { id, newExpense, amount, category } = req.body;
    let oldProject = {
        expenses: [],
    }

    Project.findOne({ _id: id })
        .then(project => {
            oldProject.expenses = [...project.expenses]
        }).then(() => {
            Project.updateOne({ _id: id }, {
                expenses: [...oldProject.expenses, { expense: newExpense, amount, category, id: uuid.v4() }]
            }, { upsert: true })
                .then(() => {
                    Project.findOne({ _id: req.params.id })
                        .then(project => {
                            res.render("project/details", { project, req })
                        })
                })
        })
})

module.exports = Router;