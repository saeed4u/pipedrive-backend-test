const Person = require('../models/Person');
const {get, set} = require('../cache/personQueryCache');
module.exports = {
    upload: (personCollection) => {
        return new Promise(async (resolve, reject) => {
            await Person.deleteMany({});
            await Person.collection.insertMany(personCollection);
            resolve(true);
        });
    },
    search: ({query}) => {
        return new Promise(async (resolve, reject) => {
            get(query, (data) => {
                if (data) {
                    console.log(data);
                    resolve(data);
                    return;
                }
                Person.find({name: {$regex: `.*${query}*.`}}, {'_id': 0}).sort({id: 'asc'}).exec()
                    .then((data) => {
                        if(data) {
                            set(query, data);
                        }
                        resolve(data);
                    });
            });
        });
    }
};