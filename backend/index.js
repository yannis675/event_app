/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

//All the necessary imPORTs
const EXPRESS = require('EXPRESS');
const BCRYPT = require('BCRYPTjs')
const APP = EXPRESS();
//Short-Term to use in the Endpoints ("APP")
APP.use(EXPRESS.json())

//Backend Environment PORT Number
const PORT = 80
//Development Mode (still in development)
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const CONFIG = require('./db/KNEXfile.js').development;
const KNEX = require('KNEX')(CONFIG)
const JWT = require('jsonwebtoken')

//Serve the frontend
APP.use(EXPRESS.static('../frontend/dist'));

//Secret hash for Token
const PEPPER = "secret";

//Serve the api (/api/event.js)
APP.use('/api/*', EXPRESS.json())
APP.use('/api/event', require('./api/event'))
    
//Send Login Credentials to Databse and compare them with Records from Table "users"
APP.post('/api/user/login', async (req,res)=> {
  let credentials = req.body
  //console.log(credentials);
  let answer =  await KNEX('users')
  .where('username', credentials.username)
  let user = answer[0]
  //Returns Boolean if the compared string matches
  let test = BCRYPT.compareSync(credentials.password, user.password)
  if (test) {
          //if mentioned Boolean is true then send Token to the Frontend
          let payload = {username:user.Username, role:user.role}
          let token = JWT.sign(payload, PEPPER)
          //Sends the Token back to the Frontend
          res.json({ 
            token: token
          })
  }
  //If the password does not match, send empty object
  else {
      res.json()
      }
})

//Get all the Records from "students" where name matches
APP.get('/api/inf18', async (req, res) => {
  //Asynchronous Function, selects data with "where" Parameter
  let person = await KNEX
  .from('students')
  .select('name')
  .where('class', 'inf18')
  //send response to frontend
  res.send(person)
  })

//Get all the Records from "students" where name matches
APP.get('/api/inf19', async (req, res) => {
  let person = await KNEX
  .from('students')
  .select('name')
  .where('class', 'inf19')
  res.send(person)
  })
//Get all the Records from "students" where name matches
APP.get('/api/inf20', async (req, res) => {
  let person = await KNEX
  .from('students')
  .select('name')
  .where('class', 'inf20')
  res.send(person)
  })

/*Note: this commented out Endpoint did not work properly, workaround is Endpoint "get_class"*/
/*   APP.get('/api/test', async (req, res) => {
    let info = req.body
    let person = await KNEX
    .from('students')
    .join('contacts', {'users.id': 'students.id'})
    .select('name')
    .whereIn('id', [1, 2, 3])
    .where('class', 'inf20')
    res.send(person)
    }) */

//Get all the Classes with their Teachers from Table "Classes"
APP.get('/api/get_class', async (req, res) => {
  let classes = await KNEX
  .from('classes')
  .select('class')
  .select('teacher')
  res.send(classes)
  })

//Backend listens to PORT which was declared in the Header of the File
APP.listen(PORT, () => console.log(`APP listening on PORT: ${PORT}!`));