const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('accounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'accounts',
    schema: 'public',
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    indexes: [
      {
        name: 'accounts_pkey',
        unique: true,
        fields: [
          { name: 'id' },
        ]
      },
    ]
  });
};
