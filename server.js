const mongoose = require('mongoose');
const config = require('./etc/config.json');
const note = require('./server/models/Note');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log(`Env port is ${process.env.PORT}`);
let serverPort = process.env.PORT || 8000;

const Note = mongoose.model('Note');
const app = express();

setUpConnection();

app.use( bodyParser.json() );
app.use(cors({ origin: '*' }));

app.get('/notes', (req, res) => {
    listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id).then(data => res.send(data));
});

function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.userName}:${config.db.userPassword}@${config.db.host}:${config.db.port}/${config.db.name}`);
}

function listNotes(id) {
    return Note.find(id);
}

function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return note.save();
}

function deleteNote(id) {
    return Note.findById(id).remove();
}

app.listen(serverPort);
console.log(`Server is up and running on port ${serverPort}`);

