const ContenedorMongoDb = require('../containers/Mongodb.container');
const ProductsSchema = require('../schemas/Products.schema');
const collection = "productos";

class ProductsDao extends ContenedorMongoDb {
  constructor() {
    super(collection, ProductsSchema)
  }
  async saveItem(item) {
    try {
      const newItem = {...item, timeStamp: Date.now()}
      return await this.createItem(newItem)
    } catch (error) {
      console.log(error.message)
    }
  }
  
  async updateItem(id, item) {
    try {
      const updateItem = await this.model.findByIdAndUpdate(id, item)
      return updateItem
    } catch (error) {
      console.log(error.message)
    }
  }

  async delItem(id) {
    try {
      const delItem = await this.model.findByIdAndDelete(id)
      return delItem
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = ProductsDao