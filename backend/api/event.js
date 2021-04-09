/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

//All the necessary imports (KNEXfile for DB-CONNECTION)
const CONNECTION = require('../db/KNEXfile').development
const KNEX = require('KNEX')(CONNECTION)
const EXPRESS = require('EXPRESS')
const APP = EXPRESS.Router()

//Base-URL Endpoint, returns all Records from "Event" (Table)
APP.get('/', (req, res) => {
  KNEX('events').then(result => {res.json(result)})
  .catch(err => console.log(err))
})

//Returns a specific Record from "Events"
APP.get('/:id', (req, res) => {
  let id = req.params.id
  KNEX('events').where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

//Inserts Record into "Events"
APP.post('/', (req, res) => {
  let record = req.body
  KNEX('events').insert(record)
  .then(result => res.json(result))
  .catch(err => console.log(err))
  console.log (record)
})

//Updates Record in "Events"
APP.put('/:id', (req, res) => {
  let record = req.body
  let id = req.params.id
  KNEX('events').update(record).where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

//Deletes certain Record from "Events"
APP.delete('/:id', (req, res) => {
  let id = req.params.id
  KNEX('events').delete().where('id',id)
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

module.exports = APP