const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    name: { type: String},

    email: { type: String},

    message: { type: String},

    resolved: { type: String, enum: {
        values: ['true', 'false', ],
        message: '{VALUE} is not supported'}},

},{timestamps:true})

const Contacts = new mongoose.model("Contacts", contactSchema);

const c1 = new Contacts({
    name: "Dhrupad",
    email: "thedhrupad@gmail.com",
    message: "Home page broken",
});

c1.save();

module.exports = Contacts;