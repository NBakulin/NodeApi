// import mongoose from "mongoose";
const mongoose        = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title     : { type: String },
    text      : { type: String, required: true },
    color     : { type: String },
    createdAt : { type: Date }
});

mongoose.model('Note', NoteSchema);
