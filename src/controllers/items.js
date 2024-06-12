import itemService from "../service/items.js";
/**
 * The controller in the context of Clean Architecture typically serves as the entry point for `handling incoming requests` from clients
 *  It interacts with the service layer to execute specific use cases or application operations based on the `request received`.
 */
// Read
const getItems = (req,res)=>{
    const items = itemService.getItems();
    res.code(200).send(items);
}

const getItem = (req,res)=>{
    const {id} = req.params;
    const item = itemService.getItemById(id);
    res.code(200).send(item); 
}
// Create
const addItem = (req, res) =>{
    const { name } = req.body;
    const item = itemService.addItem(name);
    res.code(201).send(item);
}
// Delete
const deleteItem = (req,res)=>{
    const {id} = req.params
    const index= itemService.deleteItem(id);
    res.code(200).send(`Item with id ${id} has been deleted`);
}

// Update
const updateItem = (req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const index = itemService.updateItem(id, name);
    res.code(200).send(`Item with id ${id} has been updated`);
}
export{getItems,getItem,addItem, deleteItem, updateItem};