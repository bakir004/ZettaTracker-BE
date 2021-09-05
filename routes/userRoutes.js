const express = require("express")
const router = express.Router()
const { User } = require("../models/user")
const bodyParser = require('body-parser')
const passport = require("passport")
 
const jsonParser = bodyParser.json()

const isLoggedIn = (req, res, next) => {
    if(req.session.isLoggedIn) {
        return next()
    }
    return res.json({redirect: "/"})
}
const isNotLoggedIn = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return next()
    }
    return res.json({redirect: "/"})
}

router.get("/user", jsonParser, (req, res) => {
    User.find({}, (err, docs) => {
        if(err) return res.send(err)
        return res.json(docs)
    })
})

router.get("/user/:id", jsonParser, (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(err) return res.send(err)
        return res.json(doc)
    })
})

router.post("/register", jsonParser, isNotLoggedIn, (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        
        email: req.body.email,
        password: req.body.password,

        assignedTickets: req.body.assignedTickets,
        assignedProjects: req.body.assignedProjects,
    }

    let user = new User(newUser);

    user.save((err, doc) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

router.put("/user", jsonParser, (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        
        email: req.body.email,
        password: req.body.password,

        assignedTickets: req.body.assignedTickets,
        assignedProjects: req.body.assignedProjects,
    }

    User.updateOne({_id: req.body._id}, newUser, {}, (err, doc) => {
        if (err) return res.send(err)
        return res.status(200).send("ok")
    })
})

router.delete("/user", (req, res) => {
    User.deleteMany({}, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

router.delete("/user/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send("ok");
    })
})

router.post("/login", [jsonParser, isNotLoggedIn], passport.authenticate("local", {
    failureRedirect: "/login/failure"
}), (req, res) => {
    req.session.user = req.user
    req.session.isLoggedIn = true
    return res.send(req.flash("loginAuthMessage")[0])
})

router.get("/login/failure", (req, res) => {
    res.json({message: req.flash("loginAuthMessage")[0]})
})

router.delete("/logout", isLoggedIn, (req, res) => {
    req.session.user = {}
    req.session.isLoggedIn = false
    req.logOut()
    return res.json({redirect: "/"})
})

module.exports = router