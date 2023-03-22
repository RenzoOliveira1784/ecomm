'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define('Payments', {
    value: DataTypes.DOUBLE,
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    expiration: DataTypes.DATEONLY,
    cvv: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Payments.associate = function(models) {
    // associations can be defined here
    Payments.hasOne(models.Invoice, {foreignKey: 'invoiceId'})
  };
  return Payments;
};