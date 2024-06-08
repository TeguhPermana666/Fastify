const {getItems, getItem} = require('../controllers/items');
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
function itemRoutes (fastify, options, callback) {
    // Get all data
    fastify.get('/items', getItemsOpts)

    // Get the single data
    fastify.get('/items/:id',getItemOpts)
    callback();
}


module.exports = itemRoutes;