const mongoose = require("mongoose");
const { Ticket } = require("./models/ticket");
const { User } = require("./models/user");
const { Project } = require("./models/project");
const rolePermissions = require("./rolePermissions");
const { UserInfo } = require("./models/userInfo");
const { statuses, priorities } = require("./enums")
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
        
        assignee: "6d67d0a888d4fc276cd2a430",
        reporter: "6d67d0a888d4fc276cd2a431",
        project: "7d67d0a888d4fc276cd2a430",

        priority: priorities.HIGH,
        status: statuses.OPEN,

        subtasks: [
            {
                name: "Add submit button",
                status: statuses.IN_PROGRESS
            },
            {
                name: "Add create ticket endpoint",
                status: statuses.COMPLETED
            },
        ],

        dateCreated: "27/02/2004",
        dateUpdated: "31/08/2021",
        dueDate: "01/09/2021"
    },
    {
        _id: "5d67d0a888d4fc276cd2a431",

        name: "Create Frontend",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        
        assignee: "6d67d0a888d4fc276cd2a430",
        reporter: "6d67d0a888d4fc276cd2a431",
        project: "7d67d0a888d4fc276cd2a430",

        priority: priorities.LOW,
        status: statuses.CLOSED,

        subtasks: [
            {
                name: "Add submit button",
                status: statuses.CLOSED
            },
            {
                name: "Add create ticket endpoint",
                status: statuses.OPEN
            },
        ],

        dateCreated: "27/02/2004",
        dateUpdated: "31/08/2021",
        dueDate: "01/09/2021"
    },
]

const userInfos = [
    {
        _id: "8d67d0a888d4fc276cd2a430",
        gender: "Male",
        email: "zakir.cinjarevic@gmail.com",
        password: "zakir004",
        assignedTickets: [],
        assignedProjects: [],
        role: "Admin",
        permissions: rolePermissions.ADMIN
    },
    {
        _id: "8d67d0a888d4fc276cd2a431",
        gender: "Male",
        email: "bakir.cinjarevic@gmail.com",
        password: "bakir004",
        assignedTickets: [
            "5d67d0a888d4fc276cd2a430", "5d67d0a888d4fc276cd2a431"
        ],
        assignedProjects: [],
        role: "Developer",
        permissions: rolePermissions.DEVELOPER
    },
    {
        _id: "8d67d0a888d4fc276cd2a432",
        gender: "Male",
        email: "bakeroni11@gmail.com",
        password: "bakeroni11",
        assignedTickets: [],
        assignedProjects: [],
        role: "PM",
        permissions: rolePermissions.PM
    },
]

const users = [
    {
        _id: "6d67d0a888d4fc276cd2a430",
        firstName: "Zakir",
        lastName: "Cinjarevic",
        userInfo: "8d67d0a888d4fc276cd2a430"
    },
    {
        _id: "6d67d0a888d4fc276cd2a431",
        firstName: "Bakir",
        lastName: "Cinjarevic",
        userInfo: "8d67d0a888d4fc276cd2a431"
    },
    {
        _id: "6d67d0a888d4fc276cd2a432",
        firstName: "Bakir",
        lastName: "Cinjarevic",
        userInfo: "8d67d0a888d4fc276cd2a432"
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
    UserInfo.deleteMany({}, (err) => {
        if (err) return console.log(err)
        for (let i = 0; i < userInfos.length; i++) {
            const userInfo = new UserInfo(userInfos[i]);
            saveToDb(userInfo);
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