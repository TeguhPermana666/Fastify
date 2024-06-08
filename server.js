// Import
const fastify = require('fastify')({logger: true}); // get the some extra information on the console

fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'fastify-api' },
    },
  })

fastify.register(require('./routes/items.js'));


// start server (return promise)
const start = async()=>{
    try{
        await fastify.listen({port: 5000}) // return the promise of the server
    } catch(error){
        fastify.log.error(error);
        process.exit(1) // stop the process
    }
}
start()