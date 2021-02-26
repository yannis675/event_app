const connection = require('../db/knexfile').development
const knex = require('knex')(connection)
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  knex('events').then(result => {res.json(result)})
  .catch(err => console.log(err))
})
//gibt alle Projekte aus

router.get('/:id', (req, res) => {
  let id = req.params.id
  knex('events').where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})
//gibt bestimmtes Projekt nach ID aus

router.post('/', (req, res) => {
  let record = req.body
  knex('events').insert(record)
  .then(result => res.json(result))
  .catch(err => console.log(err))
  console.log (record)
})
//inserted ein Projekt

router.put('/:id', (req, res) => {
  let record = req.body
  let id = req.params.id
  knex('events').update(record).where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})
//updatet ein Projekt

router.delete('/:id', (req, res) => {
  let id = req.params.id
  knex('events').delete().where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})
//löscht ein Projekt

module.exports = router