/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

const BCRYPT = require('bcryptjs')
let defaultPassword = '12345'
let hash = BCRYPT.hashSync(defaultPassword)

exports.seed = function (knex) {
  // Deletes existing data
  return knex('users').del()
    .then(function () {
  // Inserts new Data
      return knex('users').insert([
        { username: 'admin', firstname: 'John', lastname: 'Doe', password: BCRYPT.hashSync('12345') },
      ]);
    });
};

/*Important Commands:
seed:make [options] <name>
knex seed:run [options]
*/