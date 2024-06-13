import itemRepository from '../repository/items.js';
/**
 * contains the `business logic` of the application
 * encapsulates the use cases or application-specific operations that the system needs to perform.
 * Services coordinate interactions between different parts of the application, including repositories, to execute complex operations
 * They enforce business rules, handle transactions, and orchestrate the flow of data and operations within the application. 
 * Services abstract away the implementation details of how specific operations are carried out, promoting modularity and reusability.
 */
const itemService = {
    async getItems(){
        return await itemRepository.getItems();
    },
    async getItemById(id){
        return itemRepository.getItemById(id);
    },
    async addItem(name){
        return await itemRepository.addItem(name);
    },
    async deleteItem(id){
        return await itemRepository.deleteItem(id);
    },
    async updateItem(id, name){
        return await itemRepository.updateItem(id, name);
    }

}

export default itemService;