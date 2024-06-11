const { v4: uuidv4 } = require("uuid");
const itemRepository = require("../repository/item");

const itemService = {
  getItems: () => {
    return itemRepository.getItems();
  },

  getItemByID: (id) => {
    return itemRepository.getItemByID(id);
  },

  addItem: (itemName) => {
    if (itemName === "") {
      throw new Error("Name cannot be empty");
    }

    const retrievedItem = itemRepository.getItemByName(itemName);
    if (retrievedItem) {
      throw new Error("Item already exists");
    }

    item = {
      id: uuidv4(),
      name: itemName,
    };
    itemRepository.addItem(item);

    return itemName;
  },
};

module.exports = itemService;
