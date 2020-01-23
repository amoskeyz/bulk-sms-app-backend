module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }),
  down: queryInterface => queryInterface
    .removeColumn('Users', 'isAdmin')
};
