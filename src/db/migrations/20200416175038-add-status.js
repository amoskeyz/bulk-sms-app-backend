module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Messages', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    }),
  down: queryInterface => queryInterface
    .removeColumn('Messages', 'status')
};
