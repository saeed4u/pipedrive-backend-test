const fastify = require('fastify')({
    logger: true
});

const cors = require('fastify-cors');
const routes = require('./routes');
const multipart = require('fastify-multipart');

fastify.register(multipart);

routes.forEach((route) => {
    fastify.route(route);
});

fastify.register(cors);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await fastify.listen(port);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1)
    }
};

start().then(() => {
    fastify.log.info(`Server is listening on port ${port}`);
});