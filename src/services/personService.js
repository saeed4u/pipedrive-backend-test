const Person = require('../models/Person');
const {get, set} = require('../cache/personQueryCache');
module.exports = {
    upload: (personCollection) => {
        return new Promise((resolve, reject) => {
            Person.remove({}, () => {
                Person.collection.insert(personCollection, (err) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(true);
                })
            });
        });
    },
    search: async ({query}) => {
        return new Promise((resolve, reject) => {
            get(query, (data) => {
                if (data) {
                    console.log(data);
                    resolve(data);
                    return;
                }
                Person.find({name: {$regex: `.*${query}.*`}}, {'_id': 0}).sort({id: 'asc'}).exec()
                    .then((data) => {
                        set(query, data);
                        resolve(data);
                    });
            });
        });
    }
};