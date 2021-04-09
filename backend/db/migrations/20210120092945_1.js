/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

// Creates Table with the Attributes 
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('username').notNullable().unique()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('password').notNullable()
    })
  };
  
  //If Table already exists
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
  };
  
/*Important Commands:
knex migrate:rollback
knex migrate:latest
*/