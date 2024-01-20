const mongoose = require('mongoose')
const { URL_MONGO } = require('./config')

mongoose.connect(URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Conectado a mongo'))
  .catch(err => console.log('error al conectar a mongo', err))
