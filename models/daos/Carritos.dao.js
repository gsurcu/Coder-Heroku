const ContenedorMongoDb = require('../containers/Mongodb.container');
const CarritosSchema = require('../schemas/Carritos.schema')

const collection = "carritos"

class CarritosDao extends ContenedorMongoDb {
  constructor() {
    super(collection, CarritosSchema)
  }

}

module.exports = CarritosDao;