const express = require('express');
const bcrypt = require('bcryptjs')
const app = express();
app.use(express.json())

const port = 80
const enviroment = process.env.NODE_ENV || 'development';
const config = require('./db/knexfile.js').development;
const knex = require('knex')(config)
const jwt = require('jsonwebtoken')

// serve frontend
app.use(express.static('../frontend/dist'));

const pepper = "secret";

// serve api
app.use('/api/*', express.json())
app.use('/api/event', require('./api/event'))
    

app.post('/api/user/login', async (req,res)=> {
  let credentials = req.body
  console.log(credentials);
  let answer =  await knex('users')
  .where('username', credentials.username)
  let user = answer[0]
  console.log(user);
  let test = bcrypt.compareSync(credentials.password, user.password)
  if (test) {
          // if user is not in database it will be null
          let payload = {username:user.Username, role:user.role}
          let token = jwt.sign(payload, pepper)
          res.json({ 
            token: token
          })
  }
  else {
      res.json()
      }
})


app.get('/api/inf18', async (req, res) => {
  let person = await knex
  .from('students')
  .select('name')
  .where('class', 'inf18')
  res.send(person)
  })

app.get('/api/inf19', async (req, res) => {
  let person = await knex
  .from('students')
  .select('name')
  .where('class', 'inf19')
  res.send(person)
  })

app.get('/api/inf20', async (req, res) => {
  let person = await knex
  .from('students')
  .select('name')
  .where('class', 'inf20')
  res.send(person)
  })

/*   app.get('/api/test', async (req, res) => {
    let info = req.body
    let person = await knex
    .from('students')
    .select('name')
    .where('class', 'inf20')
    res.send(person)
    }) */

app.get('/api/get_class', async (req, res) => {
  let classes = await knex
  .from('classes')
  .select('class')
  .select('teacher')
  res.send(classes)
  })

app.listen(port, () => console.log(`App listening on port: ${port}!`));