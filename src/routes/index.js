const peopleController = require('../controllers/personController');

const baseUrl = '/api/v1';

const routes = [
    {
        method: 'POST',
        url: `${baseUrl}/upload`,
        handler: peopleController.handleUpload,
       // schema: documentation.uploadSchema
    },
    {
        method: 'POST',
        url: `${baseUrl}/search`,
        handler: peopleController.handleSearch,
       // schema: documentation.searchSchema

    }
];

module.exports = routes;