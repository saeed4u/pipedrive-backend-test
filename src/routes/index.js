const peopleController = require('../controllers/personController');

const baseEndpoint = '/api/v1';

const routes = [
    {
        method: 'POST',
        url: `${baseEndpoint}/import`,
        handler: peopleController.handleUpload,
    },
    {
        method: 'POST',
        url: `${baseEndpoint}/search`,
        handler: peopleController.handleSearch,
    }
];

module.exports = routes;