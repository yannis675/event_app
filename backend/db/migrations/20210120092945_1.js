// Creates Table with Attributes
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('username').notNullable().unique()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('password').notNullable()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
  };
  
/*Important Commands:
knex migrate:rollback
knex migrate:latest
*/