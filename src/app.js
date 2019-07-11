const fastify = require('fastify')({
    logger: true
});

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