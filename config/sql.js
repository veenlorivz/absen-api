require('dotenv').config()

const option = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    pool: {
      min: 0,
      max: 5, 
      idle: 5000, 
      acquire: 60000 
    },
    logging: false,
    logConnection: true,
    logQueryParameters: false,
    migrationStorage: 'sequelize',
    migrationStorageTableName: '_metas',
    seederStorage: 'sequelize',
    seederStorageTableName: '_seeds',
    query: {
      dateTime: process.env.DB_QUERY_DATETIME || 'SELECT CURRENT_TIMESTAMP'
    }
}

module.exports = option