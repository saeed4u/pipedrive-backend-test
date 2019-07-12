const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
    team: {type: String, required: true},
}, {_id: false});

personSchema.index({name: 1, age: 1, address: 1, team: 1});

module.exports = mongoose.model('Person', personSchema);