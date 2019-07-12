const stream = require('stream');
const Person = require('../models/Person');

module.exports = class TransfromStreamToModel extends stream.Transform {
    constructor(options) {
        super({...options, objectMode: true});
        this.persons = [];
    }

    _transform(chunk, encoding, callback) {
        /*const id = chunk[0];
         const name = chunk[1];
         const age = chunk[2];
         const address = chunk[3];
         const team = chunk[4]

         this.persons.push(new Person({id: id, name: name, age: age, address: address, team: team}))*/
        console.log(chunk);
        callback();
    }

};