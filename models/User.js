const {Schema, model} = require('mongoose')
const slugify = require('slugify')

const UserSchema = new Schema({
  name: {
    type: String,
    minlength: [3, 'El nombre debe de contener minimo 3 letras']
  },
  email: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: [true, 'El slug es obligatorio']
  },
  human: {
    type: Boolean,
    default: true
  },
  sex: {
    type: String,
    enum: ['masc', 'fem']
  },
  notas: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
}, 
  {
    timestamps: true
})


UserSchema.pre('validate', function(next) {
  this.slug = slugify(this.name).toLowerCase()
  this.email = this.email.trim().toLowerCase()
  next();
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('User', UserSchema)