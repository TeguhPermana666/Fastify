import itemRepository from '../repository/items.js';
/**
 * contains the `business logic` of the application
 * encapsulates the use cases or application-specific operations that the system needs to perform.
 * Services coordinate interactions between different parts of the application, including repositories, to execute complex operations
 * They enforce business rules, handle transactions, and orchestrate the flow of data and operations within the application. 
 * Services abstract away the implementation details of how specific operations are carried out, promoting modularity and reusability.
 */
const itemService = {
    getItems:() =>{
        return itemRepository.getItems();
    },
    getItemById:(id)=>{
        return itemRepository.getItemById(id);
    },
    addItem:(name)=>{
        return itemRepository.addItem(name);
    },
    deleteItem:(id)=>{
        const index = itemRepository.deleteItem(id);
        if (index !== -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        else{
            return index
        }
    },
    updateItem:(id, name)=>{
        const index = itemRepository.updateItem(id, name);
        if (index !== -1) {
            return index;
        }
        else{
            throw new Error(`Item with id ${id} not found`);
        }
    },

}

export default itemService;