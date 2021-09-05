const mongoose = require("mongoose");
const { Ticket } = require("./models/ticket");
const { User } = require("./models/user");
const { Project } = require("./models/project");
const config = require("./config").get(process.env.NODE_ENV);

mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const tickets = [
    {
        _id: "5d67d0a888d4fc276cd2a430",

        name: "Create UI",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        
        assigneeId: "6d67d0a888d4fc276cd2a430",
        reporterId: "6d67d0a888d4fc276cd2a431",
        projectId: "7d67d0a888d4fc276cd2a430",

        priority: "High",
        status: "Open",

        dateCreated: "27/02/2004",
        dateUpdated: "31/08/2021",
        dueDate: "01/09/2021"
    },
    {
        _id: "5d67d0a888d4fc276cd2a431",

        name: "Create Frontend",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        
        assigneeId: "6d67d0a888d4fc276cd2a430",
        reporterId: "6d67d0a888d4fc276cd2a431",
        projectId: "7d67d0a888d4fc276cd2a430",

        priority: "Medium",
        status: "Closed",

        dateCreated: "27/02/2004",
        dateUpdated: "31/08/2021",
        dueDate: "01/09/2021"
    },
]

const users = [
    {
        _id: "6d67d0a888d4fc276cd2a430",
        firstName: "Zakir",
        lastName: "Cinjarevic",
        gender: "Male",
        email: "zakir.cinjarevic@gmail.com",
        password: "zakir004",
        assignedTickets: []
    },
    {
        _id: "6d67d0a888d4fc276cd2a431",
        firstName: "Bakir",
        lastName: "Cinjarevic",
        gender: "Male",
        email: "bakir.cinjarevic@gmail.com",
        password: "bakir004",
        assignedTickets: [
            "5d67d0a888d4fc276cd2a430", "5d67d0a888d4fc276cd2a431"
        ]
    },
    {
        _id: "6d67d0a888d4fc276cd2a432",
        firstName: "Bakir",
        lastName: "Cinjarevic",
        gender: "Male",
        email: "bakeroni11@gmail.com",
        password: "bakeroni11",
        assignedTickets: []
    }
]

const projects = [
    {
        _id: "7d67d0a888d4fc276cd2a430",
        name: "Project 1",
        description: "Project description not very long yeah?"
    }
]

function saveToDb(document) {
    document.save((err) => {
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
    })
    User.deleteMany({}, (err) => {
        if (err) return console.log(err)
        for (let i = 0; i < users.length; i++) {
            const user = new User(users[i]);
            saveToDb(user);
        }
    })
    Project.deleteMany({}, (err) => {
        if (err) return console.log(err)
        for (let i = 0; i < projects.length; i++) {
            const project = new Project(projects[i]);
            saveToDb(project);
        }
    })
    console.log("Database seeded!")
}

seed();