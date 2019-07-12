const boom = require('boom');
const fs = require('fs');
const pump = require('pump');
const csv = require('csv-parse');
const TransfromStreamToModel = require('../transformers/transformStreamToModel');
const stream = require('stream');

const {upload, search} = require('../services/personService');

exports.handleUpload = (req, rep) => {
    try {
        req.multipart((field, file, filename, encoding, mimetype) => {
            if (mimetype !== 'text/csv') {
                rep.code(400).send({
                    error: true,
                    message: 'We only accept text/csv files'
                });
                return;
            }
            handler(file, filename);

        }, (err) => {
            if (err) {
                throw boom.boomify(err)
            }
            rep.code(200).send({
                error: false,
                message: 'Successfully uploaded'
            });


        });

        function handler(file, filename) {
            const newFileName = new Date().getTime() + '_' + filename;
            pump(file, fs.createWriteStream(newFileName));

            const csvParser = new csv({columns: false});
            const transformToModel = new TransfromStreamToModel();
            const readUploadedCsvFile = fs.createReadStream(newFileName);
            stream.pipeline(readUploadedCsvFile, csvParser, transformToModel,(error) => {
                console.log(error);
            })
        }

        //return await upload(req.body)
    } catch (err) {
        throw boom.boomify(err)
    }
};

exports.handleSearch = async (req, rep) => {
    try {
        return await search(req.body)
    } catch (err) {
        throw boom.boomify(err)
    }
};