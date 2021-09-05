const express = require("express")
const router = express.Router()
const { Project } = require("../models/project")
const bodyParser = require('body-parser')
 
const jsonParser = bodyParser.json()

router.get("/project", jsonParser, (req, res) => {
    Project.find({}, (err, docs) => {
        if(err) return res.send(err)
        return res.json(docs)
    })
})

router.get("/project/:id", jsonParser, (req, res) => {
    Project.findById(req.params.id, (err, doc) => {
        if(err) return res.send(err)
        return res.json(doc)
    })
})

router.post("/project", jsonParser, (req, res) => {
    const newProject = {
        name: req.body.name,
        description: req.body.description,
        
        projectManagerId: req.body.projectManagerId,
        personnelIds: req.body.personnelIds,
        ticketIds: req.body.ticketIds,

        priority: req.body.priority,
        status: req.body.status,

        dateCreated: req.body.dateCreated,
    }

    let project = new Project(newProject);

    project.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

router.put("/project", jsonParser, (req, res) => {
    const newProject = {
        name: req.body.name,
        description: req.body.description,
        
        projectManagerId: req.body.projectManagerId,
        personnelIds: req.body.personnelIds,
        ticketIds: req.body.ticketIds,

        priority: req.body.priority,
        status: req.body.status,

        dateCreated: req.body.dateCreated,
    }

    Project.updateOne({_id: req.body._id}, newProject, {}, (err, doc) => {
        if (err) return res.send(err)
        return res.status(200).send("ok")
    })
})

router.delete("/project", (req, res) => {
    Project.deleteMany({}, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

router.delete("/project/:id", (req, res) => {
    Project.findByIdAndDelete(req.params.id, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

module.exports = router