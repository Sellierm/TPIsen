const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({ extended: false });
const sharedsession = require("express-socket.io-session");
const { body, validationResult } = require('express-validator');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const hostname = '127.0.0.1';
const port = 3000;

const session = require("express-session")({
    // CIR2-chat encode in sha256
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});

app.use(express.static(__dirname + '/front/'));
app.use(urlencodedparser);
app.use(session);



http.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/SplineCurve.html');
});

app.get('/wrench', (req, res) => {
    res.sendFile(__dirname + '/front/html/wrench.html');
});
