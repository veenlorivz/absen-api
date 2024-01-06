const Sql = require('../models')

const { sequelize } = Sql;

const relation = () => {
    return [
        {
            model: sequelize.models.absen,
            as: 'absens',
            order: [['checkTime', 'desc']],
            separate: true,
        },
    ]
}

const getBy = async (options = {}) => {
    const account = await sequelize.models.accounts.findAll({
        ...options,
        include: relation()
})

    return account
}

const create = async (data) => {
    const account = await sequelize.models.accounts.create(data)

    return account
}

module.exports = { getBy, create }