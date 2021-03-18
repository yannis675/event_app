const connection = require('../db/knexfile').development
const knex = require('knex')(connection)
const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
  knex('events').then(result => {res.json(result)})
  .catch(err => console.log(err))
})
//gibt alle Projekte aus

app.get('/:id', (req, res) => {
  let id = req.params.id
  knex('events').where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})
//gibt bestimmtes Projekt nach ID aus

app.post('/', (req, res) => {
  let record = req.body
  knex('events').insert(record)
  .then(result => res.json(result))
  .catch(err => console.log(err))
  console.log (record)
})
//inserted ein Projekt

app.put('/:id', (req, res) => {
  let record = req.body
  let id = req.params.id
  knex('events').update(record).where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})
//updatet ein Projekt

app.delete('/:id', (req, res) => {
  let id = req.params.id
  knex('events').delete().where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})
//löscht ein Projekt

module.exports = app