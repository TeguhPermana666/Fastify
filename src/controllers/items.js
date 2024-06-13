import itemService from "../service/items.js";
/**
 * The controller in the context of Clean Architecture typically serves as the entry point for `handling incoming requests` from clients
 *  It interacts with the service layer to execute specific use cases or application operations based on the `request received`.
 */
// Read
export const itemController = {
    async getItems (req,res){
        try {
            const items = await itemService.getItems();
            res.status(200).send(items);
          } catch (error) {
            console.error("Error in itemController.getItems:", error);
            res.status(500).send({ error: 'Internal server error' });
        }
    },
    async getItemById(req,res){
        const {id} = req.params;
        try{
            const items = await itemService.getItemById(id);
            if(!items){
                return res.status(404).send({ error: 'Item not found' });
            }
            res.status(200).send(items);
        }catch(error){
            console.error("Error in itemController.getItemById:", error);
            res.status(500).send({ error: 'Internal server error' });
        } 
    },
    async addItem(req,res){
        const {name} = req.body;
        try{
            const newItem = await itemService.addItem(name);
            res.status(201).send(newItem);
        }catch(err){
            console.error("Error in itemController.addItem:", err);
            res.status(500).send({ error: 'Internal server error' });
        }
    },
    async deleteItem(req,res){
       const { id } = req.params;
        try {
            const deletedItem = await itemService.deleteItem(id);
            if (deletedItem) {
                res.status(200).send(deletedItem);
            } else {
                res.status(404).send({ error: 'Item not found' });
            }
        } catch (error) {
            console.error("Error in itemController.deleteItem:", error);
            res.status(500).send({ error: 'Internal server error' });
        }
    },
    async updateItem(req,res){
        const {id} = req.params;
        const {name} = req.body;
        try{
            const updatedItem = await itemService.updateItem(id,name);
            if(updatedItem){
                res.status(200).send(updatedItem);
            }else{
                res.status(404).send({error: 'Item not found'});
            }
        }catch(err){
            res.status(500).send({error: 'Internal server error'});
        }
    }
}