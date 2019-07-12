const Person = require('../models/Person');

module.exports = {
    upload: (personCollection) => {
        Person.collection.insert(personCollection, (err) => {
            if (err) {
                console.log(err);
                return false;
            }
            return true;
        })
    },
    search: ({query}) => {

    }
};