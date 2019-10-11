const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const mongoose = require("mongoose");
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const becrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT || 5000;


// import routes
const indexRouter = require("./routes/indexRouter");
const adminRouter = require("./routes/adminRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const ticketRouter = require("./routes/ticketRouter");

// middlewares
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));


// import keys
const db = require("./config/keys").MongoURI;


// config
// connect db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo db connected...")
    })
    .catch(err => {
        console.log('err', err);
    });


// Passport Config
require('./config/passport')(passport);

app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



// Routes
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/dashboard", dashboardRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/ticket", ticketRouter);
// app.user("*", "notFound")


app.listen(port, "0.0.0.0", () => console.log(`Server started on port ${port}`))


