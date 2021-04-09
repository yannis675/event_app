/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

//Enables Connection to Database
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'terminverwaltung_ipa',
      user:     'root',
      password: '12345'
    },
  },
};
