const tap = require('tap');
const test = tap.test;

import {get, set} from "../src/cache/personQueryCache";

test('Saving and reading from cache', t => {
    t.plan(1);
    const dummyData = [{id: 1, name: 'a name', age: 27, address: 'Address', team: 'BLACK'}];
    const key = 'test data';
    set(key, dummyData, (results) => {
        get(key, (data) => {
            t.deepEqual(data, dummyData);
            t.end();
        });
    });
});

test('Reading from cache with invalid key', t => {
    get('invalid key', (data) => {
        console.log(data);
        t.deepEqual(data, undefined);
        t.end();
    });
});
