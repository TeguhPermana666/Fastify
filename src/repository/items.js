//  Repository => di kususkan untuk Load data, logic yang berkaitan dengan pengambilan data pada resistance storage
/**
 * responsible for abstracting the data access layer from the rest of the application. 
 * It provides an interface to interact with the underlying data storage mechanism
 * -  database or an external API. 
 * => The repository pattern encapsulates the `logic` for fetching, storing, updating, and deleting data entities. 
 * It ensures that the rest of the application is decoupled from the details of how data is persisted, allowing for easier maintenance and testing.
 */
import items from '../../Items.js';
import {v4 as uuidv4} from 'uuid';

const itemRepository = {
    getItems:()=>{
        return items;
    },
    getItemById:(id)=>{
        const item = items.find((item) => item.id === id);
        return item;
    },
    addItem:(name)=>{
        const item = {
            id: uuidv4(),
            name,
        };
        items.push(item); // update file items
        return item; // return new item for output
    },
    deleteItem: (id) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            return index;
        }else{
            return index;
        }
    },
    updateItem:(id, name)=>{
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
            items[index].name = name; // Perbarui properti dari item yang ditemukan
        }
        return index;
    }
}

export default itemRepository;