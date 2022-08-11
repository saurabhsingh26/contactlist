const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone :{
        type: String,
        require: true
    }
});

const contact = mongoose.model('Contact',contactSchema);

module.exports = contact;