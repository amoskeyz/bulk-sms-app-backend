module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Users', 'wallet', {
      type: Sequelize.STRING,
      defaultValue: '0'
    })
    .then(() => queryInterface.addColumn('Users', 'image', {
      type: Sequelize.STRING,
      defaultValue: null
    })),
  down: queryInterface => queryInterface
    .removeColumn('Users', 'wallet')
    .then(() => queryInterface.removeColumn('Users', 'image'))
};
