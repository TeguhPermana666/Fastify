// Import
import Fastify from 'fastify'; // get the some extra information on the console
import items from './routes/items.js';
import users from './routes/users.js';
import dotenv from 'dotenv';
dotenv.config()
const PORT = process.env.PORT;

//  Load data
const fastify = Fastify({logger: true});
fastify.register(items);
fastify.register(users);


// start server (return promise)
const start = async()=>{
    try{
        await fastify.listen({port:PORT}) // return the promise of the server
    } catch(error){
        fastify.log.error(error);
        process.exit(1) // stop the process
    }
}
start();