const { DataTypes } = require('sequelize');
const _absen = require('./absen');
const _accounts = require('./accounts');

function initModels(sequelize) {
  const absen = _absen(sequelize, DataTypes);
  const accounts = _accounts(sequelize, DataTypes);

  absen.belongsTo(accounts, { as: 'account', foreignKey: 'accountId' });
  accounts.hasMany(absen, { as: 'absens', foreignKey: 'accountId' });

  return {
    absen,
    accounts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
