const express = require('express');
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
app.use('/api/project', require('./api/project'))
 

//credential is what is typed in login form
app.post('/api/user/login', async (req,res)=> {
  let credentials = req.body
  console.log(credentials);
  let answer = await knex('users')
  .where('username', credentials.username)
  .where('password', credentials.password)
  let user = answer[0]
  if (user) {
      console.log(user);
        // if user is not in database it will be null
        if (user.password === credentials.password) {
          let payload = {username:user.Username, role:user.role}
          let token = jwt.sign(payload, pepper)
          res.json({ 
            token: token
          })
        } 
  }
      else {
          res.json()
      }
})

app.get('/api/person', async (req, res) => {
  let person = await knex
  .from('students')
  .select('name')
  res.send(person)
  })

app.get('/api/inf18', async (req, res) => {
  let info = /* req.body */"inf18";
  console.log(info)
  //let info = "inf18"
  let person = await knex
  .from('students')
  .select('name')
  .where('class', info)
  res.send(person)
  })

app.get('/api/inf19', async (req, res) => {
  let person = await knex
  .from('students')
  .select('name')
  .where({ class: "inf19"})
  res.send(person)
  })

app.get('/api/inf20', async (req, res) => {
  let person = await knex
  .from('students')
  .select('name')
  .where({ class: "inf20"})
  res.send(person)
  })
  
app.get('/api/classes', async (req, res) => {
  let classes = await knex
  .from('classes')
  .select('class')
  res.send(classes)
  })

app.get('/api/class_size', async (req, res) => {
  let class_size = await knex
  .from('classes')
  .select('class')
  .select('class_size')
  res.send(class_size)
  })

  app.get('/api/pre_students', async (req, res) => {
    let students = await knex
    .from('events')
    .select('student1')
    .select('student2')
    .select('student3')
    .select('student4')
    res.send(students)
    })

app.listen(port, () => console.log(`App listening on port: ${port}!`));