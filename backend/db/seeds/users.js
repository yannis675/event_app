const bcrypt = require('bcryptjs')
let defaultPassword = '12345'
let hash = bcrypt.hashSync(defaultPassword)

exports.seed = function (knex) {
  // Deletes existing data
  return knex('users').del()
    .then(function () {
  // Inserts new Data
      return knex('users').insert([
        { username: 'admin', firstname: 'John', lastname: 'Doe', password: bcrypt.hashSync('12345') },
      ]);
    });
};

/*Important Commands:
seed:make [options] <name>
knex seed:run [options]
*/