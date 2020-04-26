module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'null'
    }),
  down: queryInterface => queryInterface
    .removeColumn('Users', 'phoneNumber')
};
