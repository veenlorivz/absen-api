/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'accounts',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          },
        },
        { transaction }
      )
      await transaction.commit()
    } catch (err) {
      if (transaction.connection.inTransaction) await transaction.rollback()
      throw err
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts')
  }
}
