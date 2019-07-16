const tap = require('tap');
const request = require('request');
const path = require('path');
const fs = require('fs');
const test = tap.test;

//app because we are going to run from the app container
const endPoint = 'http://app:8080/api/v1';

test('File upload success', t => {
    t.plan(4);
    const formData = {
        file: fs.createReadStream(path.join(__dirname, "__testData__/testdata.csv"))
    };

    request({
        method: 'POST',
        uri: `${endPoint}/import`,
        formData: formData
    }, (err, response, body) => {
        t.error(err);
        t.strictEqual(response.statusCode, 200);
        t.strictEqual(response.headers['content-length'], '' + body.length);
        t.deepEqual(JSON.parse(body), {error: false, message: "Successfully uploaded"})
    })
});

test('File upload bad request', t => {
    t.plan(4);
    const formData = {
        file: fs.createReadStream(path.join(__dirname, "__testData__/invlid.txt"))
    };

    request({
        method: 'POST',
        uri: `${endPoint}/import`,
        formData: formData
    }, (err, response, body) => {
        t.error(err);
        t.strictEqual(response.statusCode, 400);
        t.strictEqual(response.headers['content-length'], '' + body.length);
        t.deepEqual(JSON.parse(body), {error: true, message: "We only accept text/csv mimetype"})
    })
});


test('Query return valid results', t => {
    t.plan(3);
    const body = {
        query: 'Fred Caldwell'
    };
    request({
        method: 'POST',
        uri: `${endPoint}/search`,
        json: body,
    }, (err, response, body) => {
        t.error(err);
        t.strictEqual(response.statusCode, 200);
        t.deepEqual(body, {
            results: [{
                id: 1,
                name: 'Fred Caldwell',
                age: 61,
                address: 'Bater Circle, 339 Posa Grove',
                team: 'YELLOW'
            }]
        })
    })
});

test("Query return bad request", t => {
    t.plan(3);
    const body = {
        query: ''
    };
    request({
        method: 'POST',
        uri: `${endPoint}/search`,
        json: body,
    }, (err, response, body) => {
        t.error(err);
        t.strictEqual(response.statusCode, 400);
        t.deepEqual(body, {error: true, message: 'query string missing'})
        t.end();
    })
});

