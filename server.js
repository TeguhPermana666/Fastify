// Import
const fastify = require('fastify')({logger: true}); // get the some extra information on the console
fastify.register(require('./routes/items'));


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