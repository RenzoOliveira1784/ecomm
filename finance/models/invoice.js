'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    clientName: DataTypes.STRING,
    cpf: DataTypes.STRING,
    address: DataTypes.ARRAY(DataTypes.TEXT),
    itensList: DataTypes.ARRAY(DataTypes.TEXT)
  }, {});
  Invoice.associate = function(models) {
    // associations can be defined here
    Invoice.belongsTo(models.Payments, { foreignKey: 'invoiceId'})
  };
  return Invoice;
};