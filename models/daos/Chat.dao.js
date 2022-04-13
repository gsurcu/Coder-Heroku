const ContenedorMongoDb = require('../containers/Mongodb.container')
const { normalize, schema } = require('normalizr')
const ChatSchema = require('../schemas/Chat.schema')

const collection = "chat"

class ChatDao extends ContenedorMongoDb {
  constructor() {
    super(collection, ChatSchema)
    this.chatNormalizado = []
  }

  async normalizar(){
    try {
      const data = await this.listarAll()
      if (!data) {
        return false
      } else {
        const dataJson = JSON.stringify(data);
        const dataParsed = JSON.parse(dataJson);

        const schemaAll = {
          id: 'mensajes',
          mensajes: dataParsed,
        };

        const userSchema = new schema.Entity('user',{}, 
        {
          idAttribute: 'email'
        })
        const postSchema = new schema.Entity('post',
        {
          author: userSchema
        },
        {
          idAttribute: '_id'
        })
        const posts = new schema.Entity('posts',
        {
          mensajes: [postSchema]
        })
        const normalizedPost = normalize(schemaAll, posts)
        return normalizedPost;
      }

    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = ChatDao;