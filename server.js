const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config").get(process.env.NODE_ENV);
const passport = require("passport")
const { User } = require("./models/user")
const session = require("express-session")
const LocalStrategy = require('passport-local').Strategy
const flash = require("connect-flash")
const bcrypt = require("bcrypt")
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cloudinary = require("cloudinary")

//#region SETTINGS
app.use(session({
    secret: "SUPERSECRETPASSWORD123",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

cloudinary.config({
    cloud_name: "dhstlph6l",
    api_key: "182687823729481",
    api_secret: "Ad7fjC8jrd4KqxMXJ51_vywZZD4"
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

const initialize = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async (req, email, password, done) => {
        const user = await getUserByEmail(email)
        // console.log("==================================")
        // console.log("Email: " + email)
        // console.log("Password: " + password)
        // console.log("User: " + user)

        if(!user) {
            // console.log("No user flash")
            req.flash("loginAuthMessage", "No user found")
            return done(null, false)
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                // console.log("Success flash")
                req.flash("loginAuthMessage", "Successful login!")
                return done(null, user)
            } else {
                // console.log("Password incorrect flash")
                req.flash("loginAuthMessage", "Password incorrect")
                return done(null, false)
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: "email", passwordField: "password", passReqToCallback: true,},  authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((id, done) => { return done(null, getUserById(id)) })
}

const getUserByEmail = async (email) => {
    let user
    await User.findOne({email: email}).exec().then((res) => {
        if(res) user = new User(res)
        else user = null
    })
    return user
}

const getUserById = async (id) => {
    let user
    await User.findOne({_id: id}).exec().then((res) => {
        user = res
    })
    return user
}
//#endregion

initialize(passport, getUserByEmail, getUserById)

app.use(require("./routes/ticketRoutes"))
app.use(require("./routes/userRoutes"))
app.use(require("./routes/projectRoutes"))

app.post("/cloudinary/remove", jsonParser, (req, res) => {
    const {public_id, format} = req.body
    let id = public_id + "." + format;
    let resourceType = "raw"
    if(format === "jpg" || format === "png" || format === "gif" || format === "webp") {
        id = public_id
        resourceType = "image"
    }
    cloudinary.v2.uploader.destroy(public_id, {invalidate: true, resource_type: resourceType}, async (err, response) => {
        if(err) return res.send(err)
        return res.json(response)
    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server running on port: " + port);
});