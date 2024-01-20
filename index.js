const express = require('express')
const Note = require('./models/Note')
require('./mongo')

const app = express()
const User = require('./models/User')

app.get('/', (req, res) => {
  res.status(200).json({message: 'Hola Bienvenido'})
})

app.post('/user', (req, res) => {

  const user = new User({
    name: 'Miinelsondu dev',
    email: '    nelson@dev.ve     ',
    sex: 'masc',
  })

  user.save()
  .then(resp => {
    res.status(200).json({resp})
  })
  .catch(err =>  res.status(500).json({err}))
})

app.get('/user', (req, res) => {
  User.find()
  .then(resp => {
    res.status(200).json({resp})
  })
  .catch(err =>  res.status(500).json({err}))
})

app.patch('/user', (req, res) => {
  const newData = {
    name: 'Robot 3D v2 - 5',
    email: 'xx',
  }
  User.updateOne({name: 'Robot 3D v2 - 5'}, newData)
  .then(resp => {
    console.log('nModified', resp.nModified)
    if(resp.nModified < 1) {
      return res.status(404).json({resp, message: 'No se encontro el usuario'})
    }
    res.status(200).json({resp, message: 'Success'})
  })
  .catch(err =>  res.status(500).json({err}))
})

app.patch('/user/all', (req, res) => {
  const newData = {
    name: 'hacker',
    email: 'xxxxxxxxxxxxxxxxxxx',
  }
  User.updateMany({name: 'Robot 3D v2 - 5'}, newData)
  .then(resp => {
    console.log('nModified', resp.nModified)
    if(resp.nModified < 1) {
      return res.status(404).json({resp, message: 'No se encontro el usuario'})
    }
    res.status(200).json({resp, message: 'Success'})
  })
  .catch(err =>  res.status(500).json({err}))
})

app.delete('/user', (req, res) => {
  User.findByIdAndDelete('60c51949bc914f2da058bb94')
  .then(resp => {
    res.status(200).json({resp, message: 'Success'})
  })
  .catch(err =>  res.status(500).json({err}))
})

app.delete('/user/all', (req, res) => {
  User.deleteMany({name: 'Nelson Urbaneja', human: false})
  .then(resp => {
    res.status(200).json({resp, message: 'DELTETE ALL'})
  })
  .catch(err =>  res.status(500).json({err}))
})


app.post('/nota', (req, res) => {

  const nota = new Note({
    title: 'A loreye se fue y llego mucho mejor',
    content: 'Esta es la historia del mejor libro del mundo de la selva',
    author: '60c52f7893b8cb293cdb4263'
  })

  nota.save()
  .then(resp => {
    res.status(200).json({resp})
  })
  .catch(err =>  res.status(500).json({err}))
})
app.get('/nota', (req, res) => {
  const LIMIT = 5
  const OFFSET = 2
  Note.find({}).select("-slug").populate('author', {name: 1}).sort({title: 1}).limit(LIMIT).skip(OFFSET)
  .then(resp => {
    res.status(200).json({resp})
  })
  .catch(err =>  res.status(500).json({err}))
})


app.listen(7000, () => {
  console.log('App running in port 7000')
})
