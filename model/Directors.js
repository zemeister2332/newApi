const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    // name: String,
    name: {
        type: String,
        required: [true, '{PATH qismi majburiy'],
        maxlength: 10, 
        minlength: 2
    },
    surname: String,
    bio: String,
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("directory", DirectorSchema);
