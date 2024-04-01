import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    noteId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    actionItems: [
        {
            text: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
});

const model = mongoose.model('MeetingNotes', Schema);

export default model;
