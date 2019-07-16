const boom = require('boom');
const fs = require('fs');
const pump = require('pump');
const csv = require('csv-parse');
const TransfromStreamToModel = require('../transformers/transformStreamToModel');
const stream = require('stream');

const {search} = require('../services/personService');
const response = (error = false, message = 'success') => {
    return {
        error: error,
        message: message
    }
};
exports.handleUpload = (req, rep) => {
    try {
        req.multipart((field, file, filename, encoding, mimetype) => {
            if (mimetype !== 'text/csv') {
                rep.code(400).send(response(true, 'We only accept text/csv mimetype'));
                return;
            }
            handler(file, filename);
        }, (err) => {
            if (err) {
                throw boom.boomify(err)
            }
            return rep.code(200).send({
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

            stream.pipeline(readUploadedCsvFile, csvParser, transformToModel, (error) => {
                if (error) {
                    console.log(error);
                }
                fs.unlink(newFileName, () => {
                    console.log('file deleted');
                })
            });
        }

        //return await upload(req.body)
    } catch (err) {
        throw boom.boomify(err)
    }
};

exports.handleSearch = async (req, rep) => {
    try {
        if (!req.body.query.trim()) {
            return rep.code(400).send(response(true, 'query string missing'));
        }
        const results = await search(req.body);
        return rep.code(200).send({
            results: results
        })

    } catch (err) {
        console.log(err);
        throw boom.boomify(err)
    }
};