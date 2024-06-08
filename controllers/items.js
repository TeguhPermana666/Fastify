const {v4:uuidv4} = require('uuid');
let items = require('../Items');
// Read
const getItems = (req,res)=>{
    res.code(200).send(items);
}

const getItem = (req,res)=>{
    const {id} = req.params;
        
    const item = items.find((item) => item.id === id);
    res.code(200).send(item); 
}
// Create
const addItem = (req, res) =>{
    const { name } = req.body;
    const item = {
        id: uuidv4(),
        name,
    };
    items = [...items, item]; // Current item, new item (merge the data)
    res.code(201).send(item);
}
// Delete
const deleteItem = (req,res)=>{
    const {id} = req.params
    items = (items.filter((item) => item.id !== id))
    res.code(200).send({message: `Item ${id} deleted`});
}

// Update
const updateItem = (req,res)=>{
    const {id} = req.params
    const {name} = req.body

    items = items.map((item) => (item.id === id ? {id,name} : item)) 
    item = items.find((item) => item.id === id)
    res.send(item)
}
module.exports = {getItems,getItem,addItem, deleteItem, updateItem};