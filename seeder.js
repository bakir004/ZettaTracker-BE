const mongoose = require("mongoose");
const { Ticket } = require("./models/ticket");
const config = require("./config").get(process.env.NODE_ENV);

mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const tickets = [
    {
        _id: "5d67d0a888d4fc276cd2a428",
        name: "Create UI",
        assignee: "Jessie Ann Folly",
        date: "27/01/2012",
        description: ""
    },
]
function saveToDb(ticket) {
    ticket.save((err) => {
        if (err) console.log(err);
        return true;
    })
}
function seed() {
    Ticket.deleteMany({}, (err) => {
        if (err) return console.log(err)
        for (let i = 0; i < tickets.length; i++) {
            const ticket = new Ticket(tickets[i]);
            saveToDb(ticket);
        }
        console.log("Database seeded!")
    })
}

seed();