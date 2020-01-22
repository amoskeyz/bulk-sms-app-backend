module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Messages', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true
    }),
  down: queryInterface => queryInterface
    .removeColumn('Messages', 'userId')
};
