
exports.seed = function (knex) {
  // Deletes existing data
  return knex('users').del()
    .then(function () {
  // Inserts new Data
      return knex('users').insert([
        { username: 'admin', firstname: 'John', lastname: 'Doe', password: '123' },
        { username: 'yannis', firstname: 'yannis', lastname: 'anderegg', password: '12345' },
      ]);
    });
};

/*Important Commands:
seed:make [options] <name>
knex seed:run [options]
*/