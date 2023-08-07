const mongoose = require('mongoose');
// create schema
const ticketsSchema = new mongoose.Schema({
    number_1: Number,
    number_2: Number,
    number_3: Number,
    number_4: Number,
    number_5: Number,
    number_6: Number,
});
// create modal with schema
module.exports =  mongoose.model('tickets', ticketsSchema);