const express = require("express")
const router = express.Router()
const { Ticket } = require("../models/ticket")
const bodyParser = require('body-parser')
 
const jsonParser = bodyParser.json()

router.get("/ticket", jsonParser, (req, res) => {
    Ticket.find({}).populate("reporter").populate("assignee").populate("project").exec((err, docs) => {
        if(err) return res.send(err)
        return res.json(docs)
    })
})

// .populate({
// 	path:     'comments',			
// 	populate: { path:  'user',
// 		    model: 'users' }
//   })

// User.find()
//   .where('fb.id')
//   .in([3225, 623423, 6645345])
//   .exec(function (err, records) {
//     //make magic happen
//   });

router.get("/ticket/:id", jsonParser, (req, res) => {
    Ticket.findById(req.params.id).populate("reporter").populate("assignee").populate("project").exec((err, doc) => {
        if(err) return res.send(err)
        return res.json(doc)
    })
})

router.post("/ticket", jsonParser, (req, res) => {
    const newTicket = {
        name: req.body.name,
        description: req.body.description,
        
        assignee: req.body.assignee,
        reporter: req.body.reporter,
        project: req.body.project,

        priority: req.body.priority,
        status: req.body.status,

        subtasks: req.body.subtasks,

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

router.put("/ticket", jsonParser, (req, res) => {
    const newTicket = {
        name: req.body.name,
        description: req.body.description,
        
        assignee: req.body.assignee,
        reporter: req.body.reporter,
        project: req.body.project,

        priority: req.body.priority,
        status: req.body.status,

        subtasks: req.body.subtasks,

        dateCreated: req.body.dateCreated,
        dateUpdated: req.body.dateUpdated,
        dueDate: req.body.dueDate
    }

    Ticket.updateOne({_id: req.body._id}, newTicket, {}, (err, doc) => {
        if (err) return res.send(err)
        return res.json(doc)
    })
})

router.delete("/ticket", (req, res) => {
    Ticket.deleteMany({}, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

router.delete("/ticket/:id", (req, res) => {
    Ticket.findByIdAndDelete(req.params.id, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

module.exports = router