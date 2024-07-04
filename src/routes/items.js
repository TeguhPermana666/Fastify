import Fastify  from 'fastify';
// import {getItems, getItem, addItem, deleteItem, updateItem} from '../controllers/items.js';
import {itemController} from '../controllers/items.js';
import authenticateJWT from '../middleware/auth.js';
let fastify = Fastify();
const {getItems,getItemById,addItem,deleteItem,updateItem} = itemController;

// Item schema 
const Item  ={
    type:'object',
        properties:{
            id:{type:'string'},
            name:{type:'string'},
        }
}

// Read

// Option for get all items
const getItemsOpts = {
    schema:{
        response:{
            200:{
                type:'array',
                items:Item,
            },
        },
    },
    handler: getItems,
}

const getItemOpts = {
    schema:{
        response:{
            200:Item,
            404:{
                type:'object',
                properties:{
                    error: {type:'string'},
                }
            }
        },
        params:{
            type:'object',
            properties:{
                id:{type:'string'},
            }
        }
    },
    handler: getItemById,
}
// //  Create

const postItemOpts = {
    schema:{
        body:{
            type:'object',
            required:['name'],
            properties:{
                name:{type:'string'},
            },
        },
        response:{
            201: Item, 
            500:{
                type:'object',
                properties:{
                    error: {type:'string'},
                }
            }  
        },
    },
    handler:addItem,
}

const deleteItemOpts = {
    schema:{
        response:{
            200: Item,
            404:{
                type:'object',
                properties:{
                    error: {type:'string'},
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
        },
        params:{
            type:'object',
            properties:{
                id:{type:'string'},
            }
        }
    },
    handler: deleteItem,
}

const updateItemOpts = {
    schema:{
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        },
        response:{
            200: Item,
            404:{
                type:'object',
                properties:{
                    error: {type:'string'},
                },
            },
            500:{
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
            },
        },
        params: {
            type: 'object',
            required: ['id'],
            properties: {
                id: { type: 'string' }
            }
        },
    },
    handler: updateItem,
}

function itemRoutes (fastify, options, done) {
    // Get all data
    fastify.get('/items', {...getItemsOpts, preHandler: [authenticateJWT]})

    // // Get the single data
    fastify.get('/items/:id',{...getItemOpts, preHandler: [authenticateJWT]})
    
    // // Post the data
    fastify.post('/items', {...postItemOpts, preHandler: [authenticateJWT]});
    
    // // Delete the data
    fastify.delete('/items/:id', {...deleteItemOpts, preHandler: [authenticateJWT]});
    
    // // Update the data
    fastify.put('/items/:id', {...updateItemOpts, preHandler: [authenticateJWT]});
    done();
}

// Export Routes CRUD
export default itemRoutes;