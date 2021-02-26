// Creates Table with Attributes
exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.string('eventname').notNullable().unique()
    table.string('students').notNullable()
    table.string('date_weekday').notNullable()
    table.string('teacher').notNullable()
    table.string('class').notNullable()
    table.string('groupsize').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('events')
};

/*Important Commands:
knex migrate:rollback
knex migrate:latest
*/