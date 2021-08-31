const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config").get(process.env.NODE_ENV);
const { Ticket } = require("./models/ticket")
var bodyParser = require('body-parser')
 
var jsonParser = bodyParser.json()

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.post("/ticket", jsonParser, (req, res) => {
    const newTicket = {
        name: req.body.name,
        description: req.body.description
    }

    let ticket = new Ticket(newTicket);

    ticket.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

app.delete("/ticket", (req, res) => {
    Ticket.deleteMany({}, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Running on port: " + port);
});