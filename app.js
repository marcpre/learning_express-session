const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const session = require('express-session')

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

//set session
app.use(session({
    secret: 'secret'
}));
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false,
}))
app.use(express.static(path.join(__dirname, "public")))

/*
 * Routes
 */
app.get('/', function (req, res) {
    sess = req.session;
    //Session set when user Request our app via URL
    if (sess.email) {
        res.redirect('/admin');
    } else {
        res.render('index');
    }
});

app.get('/login', function (req, res) {
    res.render('login')
})

app.post('/login', (req, res) => {
    sess = req.session;

    sess.email = req.body.email;
    console.log(sess.email)
    res.redirect('/')
    
});

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});

app.get('/admin', function (req, res) {
    res.render('admin')
})

/*
 * Server
 */
//Start Server
var port = process.env.APP_PORT || 8080
var host = process.env.APP_URL || "localhost"

app.listen(port, host, function () {
    console.log("Listening on " + host + ":" + port)
})

module.exports = app