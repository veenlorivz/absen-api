const Sql = require('../models')

const { sequelize } = Sql;

const create = async (data) => {
    const account = await sequelize.models.absen.create(data)

    return account
}

module.exports = { create }