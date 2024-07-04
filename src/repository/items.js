//  Repository => di kususkan untuk Load data, logic yang berkaitan dengan pengambilan data pada resistance storage
/**
 * responsible for abstracting the data access layer from the rest of the application. 
 * It provides an interface to interact with the underlying data storage mechanism
 * -  database or an external API. 
 * => The repository pattern encapsulates the `logic` for fetching, storing, updating, and deleting data entities. 
 * It ensures that the rest of the application is decoupled from the details of how data is persisted, allowing for easier maintenance and testing.
 */
import {v4 as uuidv4} from 'uuid';
import pg from 'pg';
const {Pool} = pg;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "backend",
    password: "1110",
    port: 5432,
});

const itemRepository = {
    async getItems(){
        try{
            const result = await pool.query('SELECT * FROM item');
            return result.rows;
        }catch(err){
            throw new Error(err);
        }
    },
    async getItemById(id){
        try{
            const result = await pool.query('SELECT * FROM item WHERE id = $1', [id]);
            return result.rows[0];
       }catch(err){
           throw new Error(err);
       }
    },
    async addItem(name){
        const itemId = uuidv4();
        try{
            const result = await pool.query('INSERT INTO item (id,name) VALUES ($1,$2) RETURNING *', [itemId,name]); 
            return result.rows[0] // Return the added item brodi
        }catch(err){
            throw new Error(err);
        }
    },
    async deleteItem(id){
        try{
            const result = await pool.query('DELETE FROM item WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        }catch(err){
            throw new Error(err);
        }
    },
    async updateItem(id, name){
        try{
            const result = await pool.query('UPDATE item SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
            if(result.rowCount === 0){
                return null;
            }
            return result.rows[0]
        }catch(err){
            throw new Error(err);
        }
    }
}

export default itemRepository;