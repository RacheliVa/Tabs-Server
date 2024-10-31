const express = require('express');
const cors = require('cors');

const port = 8080;
const app = express();
app.use(cors());


let DB = [
    {
        id: 0,
        description: "Complete the new project for card design",
        priorityLevel: "Critical"
    },
    {
        id: 1,
        description: "Create a detailed specification document",
        priorityLevel: "High"
    },
    {
        id: 2,
        description: "Update the manager on project progress",
        priorityLevel: "treated"
    },
    {
        id: 3,
        description: "Schedule a meeting with the team for further planning",
        priorityLevel: "Low"
    },
    {
        id: 4,
        description: "Check user experience on the mobile version",
        priorityLevel: "Low"
    }
];


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/tabs', (req, res) => {
    res.json(DB);
});

app.get('/tabs/:id', (req, res) => {
    const id = req.params.id;
    const tab = DB.find(tab => tab.id == id);
    res.json(tab);
});

const updateArrayAtElemntAccordingToId = (array, id, update) => {
    return array.map(item => {
        if (item.id == id) {
            return {
                ...item,
                ...update
            };
        }
        return item;
    });
}


app.patch('/tabs/:id', (req, res) => {
    const id = req.params.id;
    let tab = DB.find(tab => tab.id == id);
    tab = {
        ...tab,
        ...req.body
    };
    
    DB = updateArrayAtElemntAccordingToId(DB, id, tab);
    console.log(DB);
    res.json(tab);
});

app.delete('/tabs/:id', (req, res) => {
    const id = req.params.id;
    const index = DB.findIndex(tab => tab.id == id);
    if (index !== -1) {
        DB.splice(index, 1);
        console.log(DB);
        res.status(204).send();
    } else {
        res.status(404).send({ error: 'Tab not found' });
    }
});

let nextId = DB.length; 

app.post('/tabs', (req, res) => {
    const tab = {
        id: nextId++,
        description: req.body.description,
        priorityLevel: req.body.priorityLevel
    };
    DB.push(tab);
    res.json(tab);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
