const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config").get(process.env.NODE_ENV);
const { Ticket } = require("./models/ticket")
const bodyParser = require('body-parser')
 
const jsonParser = bodyParser.json()

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

//#region TICKET ENDPOINTS

app.get("/ticket", jsonParser, (req, res) => {
    Ticket.find({}, (err, docs) => {
        if(err) return res.send(err)
        return res.json(docs)
    })
})

app.get("/ticket/:id", jsonParser, (req, res) => {
    Ticket.findById(req.params.id, (err, doc) => {
        if(err) return res.send(err)
        return res.json(doc)
    })
})

app.post("/ticket", jsonParser, (req, res) => {
    const newTicket = {
        name: req.body.name,
        description: req.body.description,
        
        assigneeId: req.body.assigneeId,
        reporterId: req.body.reporterId,
        projectId: req.body.projectId,

        priority: req.body.priority,
        status: req.body.status,

        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated,
        dueDate: req.body.dueDate
    }

    let ticket = new Ticket(newTicket);

    ticket.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

app.put("/ticket", jsonParser, (req, res) => {
    const newTicket = {
        name: req.body.name,
        description: req.body.description,
        
        assigneeId: req.body.assigneeId,
        reporterId: req.body.reporterId,
        projectId: req.body.projectId,

        priority: req.body.priority,
        status: req.body.status,

        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated,
        dueDate: req.body.dueDate
    }

    Ticket.updateOne({_id: req.body._id}, newTicket, {}, (err, doc) => {
        if (err) return res.send(err)
        return res.status(200).send("ok")
    })
})

app.delete("/ticket", (req, res) => {
    Ticket.deleteMany({}, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

app.delete("/ticket/:id", (req, res) => {
    Ticket.findByIdAndDelete(req.params.id, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

//#endregion

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server running on port: " + port);
});