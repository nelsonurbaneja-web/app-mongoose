const {Schema, model} = require('mongoose')

const NoteSchema = new Schema({
  title: String,
  slug: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

NoteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    returnedObject.slug = 'Slug-creado'
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Note', NoteSchema)