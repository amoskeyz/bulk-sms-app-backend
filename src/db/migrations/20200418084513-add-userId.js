module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Transactions', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
  down: queryInterface => queryInterface
    .removeColumn('Transactions', 'userId')
};
