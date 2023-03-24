'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientName: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.JSON
      },
      itensList: {
        type: Sequelize.JSON
      },
      invoiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Payments', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Invoices');
  }
};