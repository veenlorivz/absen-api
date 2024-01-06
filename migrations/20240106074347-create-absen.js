/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'absen',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
          },
          accountId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'accounts',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          ipAddress: {
            allowNull: false,
            type: Sequelize.STRING
          },
          latitude: {
            allowNull: true,
            type: Sequelize.STRING
          },
          longitude: {
            allowNull: true,
            type: Sequelize.STRING
          },
          checkTime: {
            allowNull: false,
            type: Sequelize.DATE
          },
          type: {
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
    await queryInterface.dropTable('absen')
  }
}
