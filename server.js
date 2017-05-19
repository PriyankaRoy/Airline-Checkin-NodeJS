var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
var fs = require("fs");
var bodyParser = require('body-parser');
app.listen(port);
app.use(bodyParser.json());
var cors = require('cors');

// use it before all route definitions
app.use(cors({ origin: 'http://localhost:4200' }));
app.post('/newapp/checkin', function (req, res) {
    try {
        var lang = req.acceptsLanguages('nl', 'en');
        if (req.body.pnr > 2000 && req.body.pnr < 4000) {
            if (lang == 'en') {
                res.status(400).send({ "Code": "9001", 'Description': 'Invalid Booking code' });
            }
            if (lang == 'nl') {
                res.status(400).send({ "Code": "9001", 'Description': 'Ongeldige reserveringscode' });
            }



        }

        else if (req.body.lastname != "watson") {
            if (lang == 'en') {
                res.status(400).send({ "Code": "9002", 'Description': 'Family name invalid' });
            }
            if (lang == 'nl') {
                res.status(400).send({ "Code": "9002", 'Description': 'Familienaam ongeldig' });
            }

        }
        else if (req.body.pnr == 5000) {
            if (lang == 'en') {
                res.status(400).send({ "Code": "9003", 'Description': 'Check-in not available yet for this flight' });
            }
            if (lang == 'nl') {
                res.status(400).send({ "Code": "9003", 'Description': 'Check-in is nog niet beschikbaar voor deze vlucht' });
            }

        }
        else if (req.body.pnr == 4000) {

            if (lang == 'en') {
                res.status(400).send({ "Code": "9004", 'Description': 'Sorry online check-in closed for this flight' });
            }
            if (lang == 'nl') {
                res.status(400).send({ "Code": "9004", 'Description': 'Sorry online inchecken is gesloten voor deze vlucht' });
            }

        }
        else {
            res.status(200).send({ "status": 'succes' });
        }
    }
    catch (e) {
        res.status(500).send('Server error')
    }




})

app.get('/newapp/checkin', function (req, res) {
    try {
        var lang = req.acceptsLanguages('nl', 'en');
        if (lang) {
            if (lang == 'en') {
                fs.readFile(__dirname + "/" + "en.json", 'utf8', function (err, data) {
                    // console.log(data);
                    res.status(200).end(data);
                });
            }
            if (lang == 'nl') {
                fs.readFile(__dirname + "/" + "nl.json", 'utf8', function (err, data) {
                    // console.log(data);
                    res.status(200).end(data);
                });
            }
            console.log('The first accepted of [nl, en] is: ' + lang);

        } else {
            console.log('None of [nl, en] is accepted');
            res.status(400).send('Language Not supported')
        }
    }
    catch (e) {
        res.status(500).send('Server error')

    }

})

console.log('todo list RESTful API server started on: ' + port);