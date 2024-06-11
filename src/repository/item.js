let items = require("../Items");

const itemRepository = {
  getItems: () => {
    return items;
  },

  getItemByID: (id) => {
    return items.find((item) => item.id === id);
  },

  getItemByName: (name) => {
    return items.find((item) => item.name === name);
  },

  addItem: (item) => {
    items = [...items, item];
    return item;
  },
};

module.exports = itemRepository;
