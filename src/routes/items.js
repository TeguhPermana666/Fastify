const fastify = require('fastify');
const {getItems, getItem, addItem, deleteItem, updateItem} = require('../controllers/items');
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
        },
    },
    handler: getItem,
}
//  Create

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
        },
    },
    handler:addItem,
}

const deleteItemOpts = {
    schema:{
        response:{
            200: {
                type:'object',
                properties:{
                    message: {type:'string'},
                }
            },
        },
    },
    handler: deleteItem,
}

const updateItemOpts = {
    schema:{
        response:{
            200: Item,
        },
    },
    handler: updateItem,
}

function itemRoutes (fastify, options, done) {
    // Get all data
    fastify.get('/items', getItemsOpts)

    // Get the single data
    fastify.get('/items/:id',getItemOpts)
    
    // Post the data
    fastify.post('/items', postItemOpts);
    
    // Delete the data
    fastify.delete('/items/:id', deleteItemOpts);
    
    // Update the data
    fastify.put('/items/:id', updateItemOpts);
    done();
}

// Export Routes CRUD
module.exports = itemRoutes;