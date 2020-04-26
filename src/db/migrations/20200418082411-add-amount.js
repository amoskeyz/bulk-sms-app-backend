module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Transactions', 'amount', {
      type: Sequelize.STRING,
      allowNull: false,
    }),
  down: queryInterface => queryInterface
    .removeColumn('Transactions', 'amount')
};
