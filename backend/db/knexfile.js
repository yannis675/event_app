// stellt Verbindung zur DB her

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
